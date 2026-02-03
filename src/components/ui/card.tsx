import * as React from "react";

import { cn } from "@/lib/utils";

// MD3 elevation mapping
const elevationClasses = {
  0: "shadow-md3-0",
  1: "shadow-md3-1",
  2: "shadow-md3-2",
  3: "shadow-md3-3",
  4: "shadow-md3-4",
  5: "shadow-md3-5",
} as const;

type Elevation = keyof typeof elevationClasses;

interface CardProps extends React.ComponentProps<"div"> {
  elevation?: Elevation;
}

function Card({ className, elevation = 1, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-[var(--md3-surface)] text-[var(--md3-on-surface)] flex flex-col gap-6 rounded-md3-lg border border-[var(--md3-outline-variant)] py-6 transition-shadow duration-md3-short4 ease-md3-standard",
        elevationClasses[elevation],
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-title-large leading-none", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-body-small text-[var(--md3-on-surface-variant)]", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
