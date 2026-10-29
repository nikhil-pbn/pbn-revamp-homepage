"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { NAV_ITEMS, type NavItem } from "@/constants/navigation";
import { cn } from "@/lib/utils";

import { MegaMenu } from "./mega-menu";
import { SmallMenu } from "./small-menu";

const ITEM_CLASS =
  "flex cursor-pointer items-center gap-1 rounded-lg border-0 bg-transparent px-2.75 py-2 text-sm whitespace-nowrap text-ink transition-colors hover:bg-lav hover:text-brand";

/** Delay before a dropdown closes after the pointer leaves it (ms). */
const CLOSE_DELAY = 180;

const subscribeNoop = () => () => {};

/**
 * The desktop menu bar (≥1180px). Dropdowns open on hover or click and close
 * on pointer-leave, Escape or a click outside the bar.
 */
export function DesktopNav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // Portals need `document`, which only exists after hydration.
  const isClient = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    const onClick = (event: MouseEvent) => {
      if (!(event.target as Element).closest("[data-nav-item]")) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [openMenu]);

  /**
   * Opening always wins; closing only applies if this item is still the open
   * one — a delayed close from the previous item must not shut the next.
   */
  const setItemOpen = (label: string, open: boolean) =>
    setOpenMenu((current) => (open ? label : current === label ? null : current));

  return (
    <>
      <nav aria-label="Main" className="ml-4.5 flex items-center gap-0.5 max-xl:hidden">
        {NAV_ITEMS.map((item) =>
          item.kind === "link" ? (
            <a key={item.label} href={item.href} className={ITEM_CLASS}>
              {item.label}
            </a>
          ) : (
            <DropdownItem
              key={item.label}
              item={item}
              open={openMenu === item.label}
              onOpenChange={(open) => setItemOpen(item.label, open)}
            />
          ),
        )}
      </nav>

      {/* Dims the page while a dropdown is open. Portalled to <body> because the
          header's backdrop-filter would otherwise contain this fixed element. */}
      {isClient &&
        createPortal(
          <div
            aria-hidden="true"
            data-open={!!openMenu}
            className="invisible fixed inset-0 z-60 opacity-0 bg-nav-dim transition-[opacity,visibility] duration-200 data-[open=true]:visible data-[open=true]:opacity-100"
          />,
          document.body,
        )}
    </>
  );
}

type DropdownItemProps = {
  item: Exclude<NavItem, { kind: "link" }>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function DropdownItem({ item, open, onOpenChange }: DropdownItemProps) {
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isMega = item.kind === "mega";

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <div
      data-nav-item
      // The mega menu spans the whole bar, so it positions against the bar, not the item.
      className={isMega ? "static" : "relative"}
      onMouseEnter={() => {
        clearTimeout(closeTimer.current);
        onOpenChange(true);
      }}
      onMouseLeave={() => {
        closeTimer.current = setTimeout(() => onOpenChange(false), CLOSE_DELAY);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
        className={cn(ITEM_CLASS, open && "bg-lav text-brand")}
      >
        {item.label}
      </button>

      <div
        data-open={open}
        className={cn(
          "invisible absolute z-5 -translate-y-1.5 opacity-0 transition-[opacity,transform,visibility] duration-200",
          "data-[open=true]:visible data-[open=true]:translate-y-0 data-[open=true]:opacity-100",
          isMega
            ? "inset-x-0 top-[calc(100%-4px)]"
            : cn("top-[calc(100%+10px)] w-max", item.kind === "menu" && item.alignRight ? "-right-2" : "-left-2"),
        )}
      >
        {/* invisible bridge so the pointer can cross the gap without closing the menu */}
        <span aria-hidden="true" className={cn("absolute inset-x-0", isMega ? "-top-3.5 h-3.5" : "-top-4.5 h-4.5")} />
        <div
          className={cn(
            "overflow-hidden border border-line bg-white shadow-dropdown",
            isMega ? "rounded-b-[18px] border-t-0" : "rounded-2xl",
          )}
        >
          {item.kind === "mega" ? <MegaMenu open={open} /> : <SmallMenu groups={item.groups} wide={item.wide} />}
        </div>
      </div>
    </div>
  );
}
