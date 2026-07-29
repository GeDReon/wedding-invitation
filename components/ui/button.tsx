import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-wedding-text text-white shadow-soft hover:bg-wedding-text/90 hover:shadow-elevated active:scale-[0.98]",
        outline:
          "border border-gold-300/60 bg-white/60 text-wedding-text backdrop-blur-sm hover:bg-white/80 hover:border-gold-400",
        ghost: "text-wedding-text hover:bg-cream-200/60",
        gold: "bg-gradient-to-r from-gold-300 to-gold-400 text-white shadow-soft hover:shadow-elevated hover:from-gold-400 hover:to-gold-500 active:scale-[0.98]",
        glass:
          "border border-white/40 bg-white/30 text-wedding-text backdrop-blur-md shadow-glass hover:bg-white/50",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-10 px-6",
        lg: "h-14 px-10 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
