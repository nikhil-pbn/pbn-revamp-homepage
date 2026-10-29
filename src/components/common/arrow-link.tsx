import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ArrowLinkProps = ComponentProps<"a"> & {
  arrow?: ReactNode;
};

/** Brand-coloured text link with an arrow that nudges on hover. */
export function ArrowLink({ arrow = "›", className, children, ...props }: ArrowLinkProps) {
  return (
    <a
      className={cn("group/link inline-flex items-center gap-1.5 text-[15px] font-medium text-brand", className)}
      {...props}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-200 group-hover/link:translate-x-1">
        {arrow}
      </span>
    </a>
  );
}
