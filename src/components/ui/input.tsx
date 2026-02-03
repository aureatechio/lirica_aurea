import { useDialogComposition } from "@/components/ui/dialog";
import { useComposition } from "@/hooks/useComposition";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const inputVariants = cva(
  "w-full min-w-0 px-4 py-3 text-body-large text-[var(--md3-on-surface)] placeholder:text-[var(--md3-on-surface-variant)] placeholder:opacity-60 selection:bg-[var(--md3-primary)] selection:text-[var(--md3-on-primary)] transition-all duration-md3-short4 ease-md3-standard outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-38",
  {
    variants: {
      variant: {
        // MD3 Filled Text Field
        filled:
          "bg-[var(--md3-surface-variant)] rounded-t-md3-sm rounded-b-none border-b-2 border-[var(--md3-on-surface-variant)] focus:border-b-[var(--md3-primary)] focus:bg-[var(--md3-primary)] focus:bg-opacity-8 aria-invalid:border-b-[var(--md3-error)] aria-invalid:focus:border-b-[var(--md3-error)]",

        // MD3 Outlined Text Field
        outlined:
          "bg-transparent rounded-md3-sm border-2 border-[var(--md3-outline)] focus:border-[var(--md3-primary)] aria-invalid:border-[var(--md3-error)] aria-invalid:focus:border-[var(--md3-error)]",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
);

interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

function Input({
  className,
  variant,
  type,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
  ...props
}: InputProps) {
  // Get dialog composition context if available (will be no-op if not inside Dialog)
  const dialogComposition = useDialogComposition();

  // Add composition event handlers to support input method editor (IME) for CJK languages.
  const {
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    onKeyDown: handleKeyDown,
  } = useComposition<HTMLInputElement>({
    onKeyDown: (e) => {
      // Check if this is an Enter key that should be blocked
      const isComposing = (e.nativeEvent as any).isComposing || dialogComposition.justEndedComposing();

      // If Enter key is pressed while composing or just after composition ended,
      // don't call the user's onKeyDown (this blocks the business logic)
      if (e.key === "Enter" && isComposing) {
        return;
      }

      // Otherwise, call the user's onKeyDown
      onKeyDown?.(e);
    },
    onCompositionStart: e => {
      dialogComposition.setComposing(true);
      onCompositionStart?.(e);
    },
    onCompositionEnd: e => {
      // Mark that composition just ended - this helps handle the Enter key that confirms input
      dialogComposition.markCompositionEnd();
      // Delay setting composing to false to handle Safari's event order
      // In Safari, compositionEnd fires before the ESC keydown event
      setTimeout(() => {
        dialogComposition.setComposing(false);
      }, 100);
      onCompositionEnd?.(e);
    },
  });

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

export { Input, inputVariants };
