import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-[#4F46E5] text-white hover:bg-[#3730A3] shadow-sm shadow-indigo-200/50",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        outline: "border border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F7F8FC] hover:border-gray-300 shadow-2xs",
        secondary: "bg-indigo-50 text-[#4F46E5] hover:bg-indigo-100 border border-indigo-100",
        ghost: "text-[#6B7280] hover:text-[#111827] hover:bg-gray-100/70",
        link: "text-[#4F46E5] underline-offset-4 hover:underline p-0 h-auto font-medium",
        dark: "bg-[#111827] text-white hover:bg-gray-800 shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base font-semibold",
        xl: "h-13 rounded-xl px-7 text-base font-bold",
        icon: "h-9 w-9 p-0",
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
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        suppressHydrationWarning
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
