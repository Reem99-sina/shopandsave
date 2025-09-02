import clsx from "clsx";
import { TextInput } from "../common/input-custom";
import { CustomSelect, Option } from "../common/select";
import { CustomCheckbox } from "../common/checkbox";
import { CustomRadio } from "../common/radio";

type FilterOption = { label: string; value: string };
type:;
export type TypeValue =
  | "text"
  | "select"
  | "checkbox"
  | "radio"
  | "custom-select"
  | "badge";
export type FilterConfig = {
  type: "text" | "select" | "checkbox" | "radio" | "custom-select" | "badge";
  key: string;
  placeholder?: string;
  options?: FilterOption[];
  multiple?: boolean;
};

interface DataTableFiltersProps {
  config: FilterConfig[];
  values: Record<string, string | string[] | Option[] | Option>;
  onChange: (key: string, value: string | string[]) => void;
  onClear: () => void;
  className?: string;
}

export function DataTableFilters({
  config,
  values,
  onChange,
  className,
}: DataTableFiltersProps) {
  console.log(values,"values")
  return (
    <div className={clsx(" flex flex-col gap-4 ")}>
      <div
        className={clsx(
          "grid grid-cols-1 md:grid-cols-3  items-end gap-4 bg-white rounded-md",
          className
        )}
      >
        {config.map((filter, index) => {
          if (filter.type === "text") {
            return (
              <div className="col-span-2" key={filter.key}>
                <TextInput
                  label={filter.key}
                  key={filter.key}
                  inputProps={{
                    placeholder: filter.placeholder,
                    value: (values[filter.key] as string) || "",
                    onChange: (e) => onChange(filter.key, e.target.value),
                  }}
                  className="w-[200px]"
                />
              </div>
            );
          }

          if (filter.type === "select") {
            console.log(values[filter.key], "values[filter.key] ");

            return (
              <CustomSelect
                key={filter.key}
                label={filter.key}
                placeholder={filter.placeholder}
                options={filter.options?.map((ele) => ({
                  label: ele?.label,
                  value: ele?.value,
                }))}
                multiple={filter.multiple}
                onChange={(value) => onChange(filter.key, value)}
                value={
                  filter.multiple
                    ? (values[filter.key] as string[])?.map((ele) => ({
                        label: ele || "",
                        value: ele,
                      }))
                    : {
                        label:
                         values[filter.key]? String((values[filter.key] as Option)?.value) : "",
                        value:
                          values[filter.key]?String((values[filter.key] as Option)?.value) : "",
                      }
                }
              />
            );
          }
          {
            if (filter.type === "custom-select") {
              return (
                <div className="flex flex-col gap-2 flex-1" key={index}>
                  <h3 className="font-semibold capitalize">{filter.key}</h3>
                  <div className="flex items-center gap-1">
                    {filter.options?.map((ele) => (
                      <div className="flex items-center gap-1" key={ele.value}>
                        {ele.value && (
                          <div
                            key={ele.value}
                            className={clsx({
                              "bg-main-blue-light text-text-hover border-text-hover  ":
                                (values[filter.key] as string) === ele.value,
                              "bg-white !text-gray-500 ":
                                (values[filter.key] as string) !== ele.value,
                            })}
                            onClick={() => onChange(filter.key, ele.value)}
                          >
                            {ele?.value}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          }

          if (filter.type === "checkbox") {
            return (
              <div key={filter.key} className="flex flex-col gap-2">
                <span className="font-medium">{filter.placeholder}</span>
                {filter.options?.map((opt) => {
                  const currentValues = (values[filter.key] as string[]) || [];

                  return (
                    <label key={opt.value} className="flex items-center gap-2">
                      <CustomCheckbox
                        checked={currentValues.includes(opt.value)}
                        onChange={(checked) => {
                          if (checked) {
                            onChange(filter.key, [...currentValues, opt.value]);
                          } else {
                            onChange(
                              filter.key,
                              currentValues.filter((v) => v !== opt.value)
                            );
                          }
                        }}
                      />
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            );
          }

          if (filter.type === "radio") {
            return (
              <div key={filter.key} className="flex flex-col gap-2">
                <span className="font-medium">{filter.placeholder}</span>
                {filter.options?.map((opt) => (
                  <CustomRadio
                    key={opt.value}
                    checked={(values[filter.key] as string) === opt.value}
                    onChange={() => onChange(filter.key, opt.value)}
                    label={opt.label}
                  />
                ))}
              </div>
            );
          }
          if (filter.type === "badge") {
            return (
              <div key={filter.key} className="flex flex-col gap-2">
                <span className="font-medium">{filter.placeholder}</span>
                <div className="flex items-center gap-3 flex-wrap">
                  {filter.options?.map((opt) => (
                    <div
                      key={opt.value}
                      className={clsx(
                        {
                          "bg-primary text-text-hover  ":
                            (values[filter.key] as string) === opt.value,
                          "bg-white !text-gray-500 ":
                            (values[filter.key] as string) !== opt.value,
                        },
                        "border-0"
                      )}
                      onClick={() => onChange(filter.key, opt.value)}
                    >
                      {opt?.value ? opt?.value : "All"}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
