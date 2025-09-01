import clsx from "clsx";


interface CustomRadioProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function CustomRadio({
  checked = false,
  onChange,
  label,
  className,
}: CustomRadioProps) {
  return (
    <label
      className={clsx(
        "flex items-center gap-2 cursor-pointer select-none text-sm",
        className
      )}
    >
      <div
        className={clsx(
          "w-5 h-5 flex items-center justify-center rounded-full border transition-colors",
          checked
            ? "border-primary bg-primary/20"
            : "border-gray-400 bg-white dark:bg-gray-800"
        )}
        onClick={(e) => {
          e.preventDefault();
          onChange?.(!checked);
        }}
      >
        {checked && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
      </div>
      {label && <span>{label}</span>}
    </label>
  );
}
