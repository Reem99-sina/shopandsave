import React, { forwardRef, useImperativeHandle } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button.component";

export interface ModalRef {
  open: () => void;
  close: () => void;
}

interface Props {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  className?: string;
  Footer?: React.ReactNode;
  needGoNextBefore?: boolean;
  goNext?: () => void;
  goBack?: () => void;
}

export const CustomModalExample = forwardRef<ModalRef, Props>(
  (
    {
      children,
      Footer,
      size = "md",
      className,
      needGoNextBefore,
      goNext,
      goBack,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsVisible(true),
      close: () => setIsVisible(false),
    }));

    // Map size to Tailwind classes
    const sizeClasses: Record<NonNullable<Props["size"]>, string> = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-2xl",
      "2xl": "max-w-3xl",
      "3xl": "max-w-4xl",
      "4xl": "max-w-5xl",
    };

    return (
      <div className="p-6">
        {isVisible && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            {/* Modal Container */}
            <div
              className={`bg-white rounded-lg shadow-lg w-full p-6 relative animate-[fadeIn_0.2s_ease-in-out] ${
                sizeClasses[size]
              } ${className || ""}`}
            >
              {/* Close button */}
              <div className="flex items-center justify-end relative">
                <Button
                  onClick={() => setIsVisible(false)}
                  className="!w-auto !bg-white !text-gray-500 hover:text-gray-800 !absolute top-4 right-4 !z-50"
                  text="✕"
                />
              </div>

              {/* Content */}
              {children}

              {/* Footer */}
              {Footer && (
                <div className="flex justify-end gap-3 mt-4">{Footer}</div>
              )}
            </div>
            {needGoNextBefore && (
              <div className="absolute w-full">
                <div className="absolute inset-y-0 left-32 flex items-center z-50">
                  <Button
                    text=""
                    onClick={goBack}
                    startIcon={<ChevronLeft className="w-5 h-5" />}
                    className="absolute -left-0 bg-white top-[50%]  transform -translate-y-1/2"
                  />
                </div>
                <div className="absolute inset-y-0 right-32 flex items-center z-50">
                  <Button
                    text=""
                    onClick={goNext}
                    startIcon={<ChevronRight className="w-5 h-5" />}
                    className="absolute -right-0 bg-white top-[50%] transform -translate-y-1/2"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);
