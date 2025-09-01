import { useTranslation } from "@/translations/client";
import clsx from "clsx";
import { Eye, EyeOff, MagnetIcon } from "lucide-react";
import React, { useState, type FC } from "react";


interface Props {
  errorMessage?: string;
  label?: string;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  onChangeText?: (text: string) => void;
  leftIcon?: React.ReactNode;
  mandatoryIcon?: boolean;
  className?: string;
}

export const TextInput: FC<Props> = ({
  label,
  inputProps = {},
  errorMessage,
  mandatoryIcon,
  leftIcon,
  className,
}) => {
  const {lang}=useTranslation()
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full">
      {label && (
        <label
          className={clsx(
            "dark:text-text-dark mb-2 text-black flex items-center gap-x-2 text-sm font-bold capitalize",
            errorMessage && "dark:text-error-dark text-error"
          )}
        >
          {label}
          {mandatoryIcon && <MagnetIcon />}
        </label>
      )}
      <div className="relative flex h-full items-center w-full">
        <div
          className={clsx(
            lang == "ar" ? "left-3" : "right-3",
            "absolute  top-1/2 -translate-y-1/2 transform cursor-pointer  flex justify-end"
          )}
          onClick={
            inputProps.type === "password"
              ? togglePasswordVisibility
              : undefined
          }
        >
          {inputProps.type === "password" && (
            <>{showPassword ? <EyeOff className="text-black"/> : <Eye className="text-black"/>}</>
          )}
          {leftIcon ? leftIcon : null}
        </div>
        <input
          {...inputProps}
          type={
            !showPassword && inputProps.type === "password"
              ? "password"
              : showPassword && inputProps.type === "password"
              ? "text"
              : inputProps.type != "password"
              ? inputProps.type
              : "text"
          }
          style={{
            fontFamily: "Verdana",
          }}
          className={clsx(
            "block min-h-[40px]  w-full bg-white px-2.5  text-xs  text-[#2D2E2E]",
            `border ${
              errorMessage ? "border-error" : "border-[#DCE0E4]"
            } rounded-md `,
            "placeholder:text-xs placeholder:font-normal ",
            `${className ? className : "rounded-lg  px-4"}`
          )}
        />
      </div>
      {errorMessage && (
        <p className="m-0 h-2 text-xs text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
