import React from "react";
import { XIcon } from "lucide-react";
import clsx from "clsx";


type Side = "top" | "right" | "bottom" | "left";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: Side;
  children: React.ReactNode;
}

export function Drawer({
  open,
  onOpenChange,
  side = "right",
  children,
}: SheetProps) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity animate-fadeIn mb-0"
          onClick={() => onOpenChange(false)}
        />
      )}

      {/* Content */}
      <div
        className={clsx(
          "fixed z-50 flex flex-col gap-4 bg-white shadow-lg transition-transform duration-300 ease-in-out mb-0",
          side === "right" &&
            (open
              ? "translate-x-0 right-0 inset-y-0 w-4/5 sm:max-w-2xl border-l"
              : "translate-x-full right-0 inset-y-0 w-4/5 sm:max-w-2xl border-l"),
          side === "left" &&
            (open
              ? "translate-x-0 left-0 inset-y-0 w-4/5 sm:max-w-2xl border-r"
              : "-translate-x-full left-0 inset-y-0 w-4/5 sm:max-w-2xl border-r"),
          side === "top" &&
            (open
              ? "translate-y-0 top-0 inset-x-0 h-auto border-b"
              : "-translate-y-full top-0 inset-x-0 h-auto border-b"),
          side === "bottom" &&
            (open
              ? "translate-y-0 bottom-0 inset-x-0 h-auto border-t"
              : "translate-y-full bottom-0 inset-x-0 h-auto border-t")
        )}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition z-40"
          onClick={() => onOpenChange(false)}
        >
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </>
  );
}

/* Subcomponents */
export function SheetHeader({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("flex flex-col gap-1.5 p-4", className)}>{children}</div>
  );
}

export function SheetFooter({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("mt-auto flex flex-col gap-2 p-4", className)}>
      {children}
    </div>
  );
}

export function SheetTitle({
  className,
  children,
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={clsx("font-semibold text-foreground", className)}>
      {children}
    </h2>
  );
}

export function SheetDescription({
  className,
  children,
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={clsx("text-sm text-muted-foreground", className)}>{children}</p>
  );
}
