"use client";
import * as React from "react";
import Link from "next/link";

type LabelVisibility = "always" | "sm+" | "md+" | "lg+" | "xl+" | "icon-only";

type BaseProps = {
  className?: string;
  iconLeft?: React.ReactElement<{ className?: string }>;
  iconClassName?: string;
  /** When should the text label be visible? */
  labelVisibility?: LabelVisibility; // ← new
  /** Needed if you hide the label (for accessibility) */
  ariaLabel?: string;

  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md";
};

function classes(variant: BaseProps["variant"] = "outline", size: BaseProps["size"] = "md") {
  const base = "inline-flex items-center gap-2 rounded-xl transition whitespace-nowrap";
  const sizing = size === "sm" ? "h-9 px-3 text-sm" : "h-10 px-4";
  const v =
    variant === "primary"
      ? "bg-white text-slate-800 ring-1 ring-black/10 hover:ring-black/15 shadow-sm hover:shadow"
      : variant === "ghost"
      ? "text-gray-700 hover:bg-gray-100"
      : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50";
  return `${base} ${sizing} ${v}`;
}

function labelClass(vis: LabelVisibility = "always") {
  switch (vis) {
    case "icon-only": return "sr-only";                // hidden but accessible
    case "sm+":       return "hidden sm:inline";       // show at ≥640px
    case "md+":       return "hidden md:inline";       // show at ≥768px
    case "lg+":       return "hidden lg:inline";       // show at ≥1024px
    case "xl+":       return "hidden xl:inline";       // show at ≥1280px
    case "always":
    default:          return "";                       // always visible
  }
}

function renderIcon(icon?: React.ReactElement<{ className?: string }>, extra?: string) {
  if (!icon) return null;
  const prev = (icon.props?.className ?? "").trim();
  return React.cloneElement(icon, {
    className: `h-4 w-4 ${prev} ${extra ?? ""}`.trim(),
  });
}

export function LinkButton({
  href,
  className = "",
  iconLeft,
  iconClassName,
  labelVisibility = "always",
  ariaLabel,
  children,
  variant = "primary",
  size = "sm",
  ...props
}: BaseProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href={href}
      className={`${classes(variant, size)} ${className}`}
      aria-label={labelVisibility !== "always" ? ariaLabel : undefined}
      {...props}
    >
      {renderIcon(iconLeft, iconClassName)}
      <span className={labelClass(labelVisibility)}>{children}</span>
    </Link>
  );
}
