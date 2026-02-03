import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-label-large transition-all duration-md3-short4 ease-md3-standard disabled:pointer-events-none disabled:opacity-38 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[var(--md3-primary)] focus-visible:ring-opacity-12 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        // MD3 Filled Button - High emphasis
        filled:
          "bg-[var(--md3-primary)] text-[var(--md3-on-primary)] shadow-md3-0 hover:shadow-md3-1 hover:brightness-110 active:shadow-md3-0 active:brightness-105",

        // MD3 Filled Tonal Button - Medium emphasis
        "filled-tonal":
          "bg-[var(--md3-secondary-container)] text-[var(--md3-on-secondary-container)] shadow-md3-0 hover:shadow-md3-1 hover:brightness-105 active:shadow-md3-0",

        // MD3 Outlined Button - Medium emphasis
        outlined:
          "border-2 border-[var(--md3-outline)] bg-transparent text-[var(--md3-primary)] hover:bg-[var(--md3-primary)] hover:bg-opacity-8 active:bg-opacity-12",

        // MD3 Text Button - Low emphasis
        text:
          "bg-transparent text-[var(--md3-primary)] shadow-md3-0 hover:bg-[var(--md3-primary)] hover:bg-opacity-8 active:bg-opacity-12",

        // MD3 Elevated Button - Low emphasis with elevation
        elevated:
          "bg-[var(--md3-surface)] text-[var(--md3-primary)] shadow-md3-1 hover:shadow-md3-2 hover:bg-[var(--md3-primary)] hover:bg-opacity-8 active:shadow-md3-1 active:bg-opacity-12",

        // Additional variants for specific use cases
        destructive:
          "bg-[var(--md3-error)] text-[var(--md3-on-error)] shadow-md3-0 hover:shadow-md3-1 hover:brightness-110 active:shadow-md3-0 active:brightness-105",

        "destructive-tonal":
          "bg-[var(--md3-error-container)] text-[var(--md3-on-error-container)] shadow-md3-0 hover:shadow-md3-1 hover:brightness-105 active:shadow-md3-0",
      },
      size: {
        default: "h-10 px-6 py-2.5 rounded-md3-full has-[>svg]:px-4",
        sm: "h-8 px-4 py-1.5 rounded-md3-full gap-1.5 text-label-medium has-[>svg]:px-3",
        lg: "h-12 px-8 py-3 rounded-md3-full has-[>svg]:px-6",
        icon: "size-10 rounded-md3-full",
        "icon-sm": "size-8 rounded-md3-full",
        "icon-lg": "size-12 rounded-md3-full",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
