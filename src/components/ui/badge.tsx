import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--md3-primary)] text-[var(--md3-on-primary)] [a&]:hover:brightness-110",
        secondary:
          "border-transparent bg-[var(--md3-secondary-container)] text-[var(--md3-on-secondary-container)] [a&]:hover:brightness-105",
        destructive:
          "border-transparent bg-[var(--md3-error)] text-[var(--md3-on-error)] [a&]:hover:brightness-110",
        outline:
          "border-[var(--md3-outline)]/40 text-[var(--md3-on-surface)] [a&]:hover:bg-[var(--md3-surface-container)]/50 [a&]:hover:border-[var(--md3-outline)]/60",
        success:
          "border-transparent bg-[var(--md3-success-container)] text-[var(--md3-on-success-container)] [a&]:hover:brightness-105",
        tertiary:
          "border-transparent bg-[var(--md3-tertiary-container)] text-[var(--md3-on-tertiary-container)] [a&]:hover:brightness-105",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
