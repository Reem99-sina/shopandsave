import clsx from "clsx";
import { Check } from "lucide-react";


interface CustomCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function CustomCheckbox({ checked = false, onChange, label, className }: CustomCheckboxProps) {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 cursor-pointer select-none text-sm"
      )}
    >
      <div
        className={clsx(
          "w-5 h-5 flex items-center justify-center rounded border transition-colors",
          checked
            ? "bg-primary border-primary text-primary-foreground"
            : "border-gray-400 bg-white dark:bg-gray-800",
            className?`${className}`:""
        )}
        onClick={(e) => {
          e.preventDefault();
          onChange?.(!checked);
        }}
      >
        {checked && <Check size={14} strokeWidth={3} />}
      </div>
      {label && <span>{label}</span>}
    </div>
  );
}