"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:!bg-white group-[.toaster]:!text-gray-900 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl group-[.toaster]:backdrop-blur-none",
          description: "group-[.toast]:!text-gray-600",
          actionButton: "group-[.toast]:bg-red-500 group-[.toast]:!text-white",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:!text-gray-600",
          success:
            "group-[.toast]:!bg-green-50 group-[.toast]:border-green-200 group-[.toast]:!text-green-900 group-[.toast]:backdrop-blur-none",
          error:
            "group-[.toast]:!bg-red-50 group-[.toast]:border-red-200 group-[.toast]:!text-red-900 group-[.toast]:backdrop-blur-none",
          warning:
            "group-[.toast]:!bg-yellow-50 group-[.toast]:border-yellow-200 group-[.toast]:!text-yellow-900 group-[.toast]:backdrop-blur-none",
        },
      }}
      style={
        {
          "--normal-bg": "hsl(var(--background))",
          "--normal-text": "hsl(var(--foreground))",
          "--normal-border": "hsl(var(--border))",
          "--success-bg": "hsl(var(--background))",
          "--success-text": "hsl(var(--foreground))",
          "--success-border": "hsl(var(--border))",
          "--error-bg": "hsl(var(--background))",
          "--error-text": "hsl(var(--foreground))",
          "--error-border": "hsl(var(--border))",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
