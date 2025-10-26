// src/ui/sheet.tsx
import * as React from "react";

/** Root <Sheet> */
export type SheetProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function Sheet({
  children,
  ...props
}: React.PropsWithChildren<SheetProps>) {
  return <div {...props}>{children}</div>;
}

/** <SheetContent> */
export type SheetContentProps = React.HTMLAttributes<HTMLDivElement> & {
  side?: "left" | "right";
};

export function SheetContent({
  children,
  ...props
}: React.PropsWithChildren<SheetContentProps>) {
  return <div {...props}>{children}</div>;
}

/** Header / Title / Description stubs */
export function SheetHeader({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function SheetTitle(
  props: React.HTMLAttributes<HTMLHeadingElement>
) {
  return <h2 {...props} />;
}

export function SheetDescription(
  props: React.HTMLAttributes<HTMLParagraphElement>
) {
  return <p {...props} />;
}
