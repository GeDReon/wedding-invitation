import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-beige-200/80 bg-white/60 px-4 py-2 text-base text-wedding-text shadow-sm backdrop-blur-sm transition-all duration-300 placeholder:text-wedding-muted/60 focus-visible:border-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-200 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };