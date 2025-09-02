import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { TextInput } from "./input-custom";



export type Option = {
  label: string;
  value: string;
  group?: string;
};

type CustomSelectProps = {
  label?: string;
  placeholder?: string;
  options?: Option[];
  multiple?: boolean;
  value: Option | Option[] | null;
  onChange: (val: any) => void;
};

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  placeholder = "Choose one",
  options,
  multiple = false,
  value,
  onChange,
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options?.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const groupedOptions = filteredOptions?.reduce((acc, option) => {
    const group = option.group || "Other";
    if (!acc[group]) acc[group] = [];
    acc[group].push(option);

    return acc;
  }, {} as Record<string, Option[]>);

  const toggleOption = (opt: Option) => {
    if (multiple) {
      const arr = Array.isArray(value) ? [...value] : [];
      const exists = arr.find((v) => v.value === opt.value);
      if (exists) {
        onChange(arr.filter((v) => v.value !== opt.value));
      } else {
        onChange([...arr, opt]);
      }
    } else {
      onChange(opt);
      setOpen(false);
    }
  };

  const isSelected = (opt: Option) => {
    if (multiple) {

      return Array.isArray(value) && value.some((v) => v.value === opt.value);
    }

    return (value as Option)?.value === opt.value;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="w-full relative text-sm">
      {label && <label className="font-bold mb-1 block capitalize">{label}</label>}

      <button
        type="button"
        className="relative w-full cursor-pointer rounded border-2 !border-gray-300 bg-white py-2 pl-3 pr-10 text-left"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="block truncate">
          {multiple
            ? Array.isArray(value) && value.length > 0
              ? value.map((v) => v.label).join(", ")
              : placeholder
            : (value as Option)?.label || placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
          <ChevronDown size={16} />
        </span>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 max-h-60 min-w-[12rem] overflow-auto rounded bg-white py-1 text-sm shadow-lg border border-gray-200">
          <div className="px-2 pb-2">
            <TextInput
              inputProps={{
                placeholder: "Search...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className:
                  "w-full rounded border px-2 py-1 text-sm focus:outline-none",
              }}
            />
          </div>
          {groupedOptions &&
            Object?.entries(groupedOptions).map(([group, items]) => (
              <div key={group}>
                {group !== "Other" && (
                  <div className="px-3 py-1 text-xs font-semibold text-gray-500">
                    {group}
                  </div>
                )}
                {items.map((opt,index) => (
                  <div
                    key={opt.value+index}
                    onClick={() => toggleOption(opt)}
                    className={`relative cursor-pointer select-none py-2 pl-10 pr-4 hover:bg-main-blue-light hover:text-text-hover ${
                      isSelected(opt) ? "bg-main-blue-light font-medium" : ""
                    }`}
                  >
                    <span className="block truncate">{opt.label}</span>
                    {isSelected(opt) && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-hover">
                        ✔
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
