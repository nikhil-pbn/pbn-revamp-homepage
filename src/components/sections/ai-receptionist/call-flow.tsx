"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

import { ProductAvatar } from "@/components/common";
import { CALL_FLOW, CALL_FLOW_TIMING, type FlowBranch, type FlowNode } from "@/constants/ai-receptionist";
import { usePrefersReducedMotion, useTimeline } from "@/hooks";
import { Icon } from "@/icons";
import { cn } from "@/lib/utils";
import { easeInOutQuad } from "@/utils/math";

type NodeId = "call" | "ai" | "b0" | "b1" | "b2";
type PathId = "pt" | "p0" | "p1" | "p2";
type Geometry = { width: number; height: number; d: Record<PathId, string> };

const PATH_IDS: readonly PathId[] = ["pt", "p0", "p1", "p2"];
const BRANCH_IDS = ["b0", "b1", "b2"] as const;
const NODE_IDS: readonly NodeId[] = ["call", "ai", ...BRANCH_IDS];

const sameGeometry = (a: Geometry | null, b: Geometry | null) =>
  a === b ||
  (!!a && !!b && a.width === b.width && a.height === b.height && PATH_IDS.every((id) => a.d[id] === b.d[id]));

/* shared classes */
const placed =
  "absolute -translate-x-1/2 -translate-y-1/2 max-sm:relative max-sm:left-auto max-sm:top-auto max-sm:translate-none";
const nodeBase =
  "z-1 flex items-center gap-2.5 px-4 py-3 text-[13.5px] whitespace-nowrap transition-[box-shadow,scale] duration-300 max-sm:whitespace-normal";
const nodeOn = "scale-104 max-sm:scale-100";
const cardNode = "rounded-2xl bg-white";
/** Centre-point columns of the three branches; ≤640px everything stacks in DOM order. */
const BRANCH_LEFT = ["left-[17%]", "left-1/2", "left-[83%]"] as const;

function NodeText({
  title,
  subtitle,
  subtitleClassName,
}: {
  title: string;
  subtitle: string;
  subtitleClassName?: string;
}) {
  return (
    <div>
      <b className="block font-medium">{title}</b>
      <small className={cn("block text-[11px] text-ink-muted", subtitleClassName)}>{subtitle}</small>
    </div>
  );
}

function NodeIcon({ node }: { node: FlowNode }) {
  return (
    <span className={cn("grid size-8 flex-none place-items-center rounded-[10px]", node.iconClassName)}>
      {"name" in node.icon ? (
        <Icon name={node.icon.name} size={16} strokeWidth={2.2} className="text-white" />
      ) : (
        <Icon d={node.icon.d} size={16} strokeWidth={2.2} className="text-white" />
      )}
    </span>
  );
}

/**
 * The "how a call flows" diagram: incoming call → AI receptionist → three outcomes.
 * Connector paths are measured from the rendered nodes; a dot travels along the
 * active path and the loop cycles through the three branches.
 */
export function CallFlow() {
  const reduce = usePrefersReducedMotion();
  const flowRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Partial<Record<NodeId, HTMLDivElement | null>>>({});
  const pathRefs = useRef<Partial<Record<PathId, SVGPathElement | null>>>({});
  const dotRef = useRef<SVGCircleElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);
  const rafRef = useRef(0);
  const { at, clear } = useTimeline();

  // not `once`: the loop stops while the diagram is off screen and restarts on return
  const inView = useInView(flowRef, { amount: 0.3 });
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [activeNodes, setActiveNodes] = useState<NodeId[]>([]);
  const [activePaths, setActivePaths] = useState<PathId[]>([]);
  const [results, setResults] = useState<number[]>([]);

  /* measure node edges and build the connector paths (design: build()) */
  const build = useCallback(() => {
    const flow = flowRef.current;
    if (!flow) return;
    if (window.innerWidth <= CALL_FLOW_TIMING.stackedMaxWidth) {
      setGeometry(null);
      return;
    }
    // all reads first, then a single state write
    const f = flow.getBoundingClientRect();
    const pt = (id: NodeId, edge: "top" | "bottom") => {
      const r = nodeRefs.current[id]?.getBoundingClientRect();
      if (!r) return { x: 0, y: 0 };
      return { x: r.left - f.left + r.width / 2, y: (edge === "top" ? r.top : r.bottom) - f.top };
    };
    const c = pt("call", "bottom");
    const a1 = pt("ai", "top");
    const a2 = pt("ai", "bottom");
    const branch = (id: NodeId) => {
      const b = pt(id, "top");
      const m = (a2.y + b.y) / 2;
      return `M${a2.x} ${a2.y} C${a2.x} ${m} ${b.x} ${m} ${b.x} ${b.y}`;
    };
    const next: Geometry = {
      width: flow.clientWidth,
      height: flow.clientHeight,
      d: { pt: `M${c.x} ${c.y} L${a1.x} ${a1.y}`, p0: branch("b0"), p1: branch("b1"), p2: branch("b2") },
    };
    setGeometry((prev) => (sameGeometry(prev, next) ? prev : next));
  }, []);

  // Re-measure (once per frame at most) whenever the panel or any node changes
  // size: viewport resizes, web-font swaps, breakpoint changes.
  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return;
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(build);
    };
    const ro = new ResizeObserver(schedule);
    ro.observe(flow);
    for (const id of NODE_IDS) {
      const node = nodeRefs.current[id];
      if (node) ro.observe(node);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [build]);

  /* move the dot along a path with ease-in-out-quad */
  const travel = useCallback((id: PathId, ms: number, done: () => void) => {
    const path = pathRefs.current[id];
    const dot = dotRef.current;
    const halo = haloRef.current;
    if (!path || !dot || !halo) {
      done();
      return;
    }
    const length = path.getTotalLength();
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      const q = path.getPointAtLength(length * easeInOutQuad(p));
      for (const c of [dot, halo]) {
        c.setAttribute("cx", String(q.x));
        c.setAttribute("cy", String(q.y));
      }
      if (p < 1) rafRef.current = requestAnimationFrame(step);
      else done();
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  /* the loop: call → AI → branch k → result, then the next branch (only while on screen) */
  useEffect(() => {
    if (reduce || !inView) return;
    let k = 0;
    const T = CALL_FLOW_TIMING;
    const cycle = () => {
      const b = k % BRANCH_IDS.length;
      const branchPath = PATH_IDS[b + 1];
      setResults([]);
      setActivePaths(["pt"]);
      setActiveNodes(["call"]);
      at(T.start, () =>
        travel("pt", T.toAi, () => {
          setActiveNodes(["ai"]);
          at(T.aiPause, () => {
            setActivePaths((p) => [...p, branchPath]);
            travel(branchPath, T.toBranch, () => {
              setActiveNodes([BRANCH_IDS[b]]);
              setResults([b]);
              k++;
              at(T.hold, cycle);
            });
          });
        }),
      );
    };
    cycle();
    return () => {
      clear();
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduce, inView, at, clear, travel]);

  // reduced motion: the design's static end state (all paths + results shown, no node highlighted)
  const pathOn = (id: PathId) => reduce || activePaths.includes(id);
  const nodeIsOn = (id: NodeId) => !reduce && activeNodes.includes(id);
  const resultOn = (i: number) => reduce || results.includes(i);
  const { call, ai, branches } = CALL_FLOW;

  return (
    <div
      ref={flowRef}
      role="figure"
      aria-label={CALL_FLOW.ariaLabel}
      className="relative isolate h-[540px] overflow-hidden rounded-[28px] border border-line shadow-flow bg-flow max-sm:flex max-sm:h-auto max-sm:flex-col max-sm:items-start max-sm:gap-2.5 max-sm:px-4 max-sm:py-5"
    >
      {/* soft white spotlight + inner hairline frame */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[32%] left-1/2 -z-1 size-105 -translate-1/2 rounded-full bg-flow-spot"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-3.5 -z-1 rounded-[20px] border border-white/80"
      />

      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-visible max-sm:hidden"
        viewBox={geometry ? `0 0 ${geometry.width} ${geometry.height}` : undefined}
      >
        {geometry &&
          PATH_IDS.map((id) => (
            <path
              key={id}
              ref={(el) => {
                pathRefs.current[id] = el;
              }}
              d={geometry.d[id]}
              className={cn(
                "fill-none stroke-2 transition-[stroke] duration-300",
                pathOn(id) ? "stroke-brand" : "stroke-lav-strong",
              )}
            />
          ))}
        {geometry && (
          <>
            <circle ref={haloRef} r={12} cx={-40} cy={-40} className="fill-brand/22" />
            <circle ref={dotRef} r={6} cx={-40} cy={-40} className="fill-brand" />
          </>
        )}
      </svg>

      {/* incoming call */}
      <div
        ref={(el) => {
          nodeRefs.current.call = el;
        }}
        className={cn(
          placed,
          nodeBase,
          cardNode,
          "top-[9%] left-1/2",
          nodeIsOn("call") ? [nodeOn, "shadow-node-on"] : "shadow-node",
        )}
      >
        <NodeIcon node={call} />
        <NodeText title={call.title} subtitle={call.subtitle} />
      </div>

      {/* AI receptionist */}
      <div
        ref={(el) => {
          nodeRefs.current.ai = el;
        }}
        className={cn(
          placed,
          nodeBase,
          "rounded-2xl bg-ink px-5 py-3.5 text-white",
          "top-[32%] left-1/2",
          nodeIsOn("ai") ? [nodeOn, "shadow-node-ai-on"] : "shadow-node-ai",
        )}
      >
        <ProductAvatar avatar={ai.avatar} sizes="48px" className="size-12 rounded-full shadow-agent-glow" />
        <NodeText title={ai.title} subtitle={ai.subtitle} subtitleClassName="text-lav-strong" />
      </div>

      {branches.map((branch, i) => {
        const id = BRANCH_IDS[i];
        return (
          <FlowBranchItems
            key={id}
            branch={branch}
            leftClassName={BRANCH_LEFT[i]}
            nodeRef={(el) => {
              nodeRefs.current[id] = el;
            }}
            nodeOn={nodeIsOn(id)}
            resultOn={resultOn(i)}
          />
        );
      })}
    </div>
  );
}

function FlowBranchItems({
  branch,
  leftClassName,
  nodeRef,
  nodeOn: on,
  resultOn,
}: {
  branch: FlowBranch;
  leftClassName: string;
  nodeRef: (el: HTMLDivElement | null) => void;
  nodeOn: boolean;
  resultOn: boolean;
}) {
  const { tag, node, result } = branch;
  return (
    <>
      <span
        className={cn(
          placed,
          "z-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-brand shadow-inset-lav max-sm:mt-2",
          "top-[51%]",
          leftClassName,
        )}
      >
        {tag.label}
      </span>
      <div
        ref={nodeRef}
        className={cn(
          placed,
          nodeBase,
          cardNode,
          "w-[28%] max-w-50 flex-col gap-2 px-3 py-3.5 text-center whitespace-normal max-sm:ml-4 max-sm:w-auto max-sm:max-w-none max-sm:flex-row max-sm:text-left",
          "top-[69%]",
          leftClassName,
          on ? [nodeOn, "shadow-node-on"] : "shadow-node",
        )}
      >
        <NodeIcon node={node} />
        <NodeText title={node.title} subtitle={node.subtitle} />
      </div>
      <span
        className={cn(
          placed,
          "z-1 max-w-[30%] rounded-full bg-green-soft px-2.75 py-1.25 text-center text-[11.5px] font-medium text-green-ink opacity-0 transition-[opacity,scale] duration-400 max-sm:ml-4 max-sm:max-w-none max-sm:opacity-100",
          "top-[90%]",
          leftClassName,
          resultOn && "scale-104 opacity-100 max-sm:scale-100",
        )}
      >
        {result.label}
      </span>
    </>
  );
}
