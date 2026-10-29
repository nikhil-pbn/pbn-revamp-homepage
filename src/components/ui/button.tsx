import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "radix-ui";

const buttonVariants = cva(
  "group/btn inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border-0 font-normal whitespace-nowrap transition-[background,box-shadow,color] duration-200 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand text-white hover:bg-brand-dark hover:shadow-btn-primary",
        dark: "bg-ink text-white hover:bg-black",
        outline: "bg-transparent text-ink shadow-inset-ink hover:bg-ink hover:text-white",
        soft: "bg-white text-ink shadow-inset-line hover:shadow-inset-brand",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "h-auto px-0 font-medium text-brand",
      },
      size: {
        default: "h-12 px-6 text-[15px]",
        sm: "h-10 px-[18px] text-sm",
        lg: "h-auto px-8 py-4 text-[17px]",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

/** The "→" that nudges right when its button is hovered. */
function ButtonArrow({ children = "→" }: { children?: React.ReactNode }) {
  return (
    <span aria-hidden="true" className="transition-transform duration-200 group-hover/btn:translate-x-1">
      {children}
    </span>
  );
}

export { Button, ButtonArrow, buttonVariants };
