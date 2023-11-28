import { InputHTMLAttributes, ReactNode, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";
import { Field } from "formik";

const CustomInput = ({
  icon,
  title,
  name,
  inputProps,
  error,
  touched,
  as,
}: {
  icon?: string;
  name: string;
  title: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  error: any;
  touched: any;
  as?: ReactNode;
}) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [inputType, setInputType] = useState(inputProps?.type ?? "text");
  return (
    <div
      className={cn(
        "input-group flex items-center rounded glossy-only sm:gap-3 gap-2 w-full bg-accent border-2 transition-all border-transparent sm:px-5 px-3 py-2",
        inputFocus ? "border-primary" : "",
        inputProps?.disabled ? "bg-gray-100 cursor-not-allowed" : "",
        error && touched ? "border-destructive" : ""
      )}
    >
      {icon ? (
        <label className="block" htmlFor={name}>
          <Icon
            icon={icon}
            className={cn(
              "text-3xl text-gray-600",
              inputFocus ? "text-foreground" : "",
              inputProps?.disabled ? "text-gray-400" : ""
            )}
          />
        </label>
      ) : null}
      {inputProps?.type === "password" ? (
        <div className="w-full flex items-center justify-between">
          <Field
            id={name}
            name={name}
            placeholder={title}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            className="block placeholder:text-gray-600 disabled: disabled:placeholder:text-gray-400 w-full disabled:cursor-not-allowed bg-transparent outline-none peer"
            {...inputProps}
            type={inputType}
          />
          <button
            onClick={() =>
              setInputType(inputType === "text" ? "password" : "text")
            }
            type="button"
          >
            <Icon
              icon={
                inputType === "password"
                  ? "fluent:eye-20-regular"
                  : "fluent:eye-off-20-regular"
              }
              className="text-2xl"
            />
          </button>
        </div>
      ) : (
        <Field
          id={name}
          name={name}
          placeholder={title}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          as={as}
          className="block placeholder:text-gray-600 disabled: disabled:placeholder:text-gray-400 w-full disabled:cursor-not-allowed bg-transparent outline-none"
          {...inputProps}
        />
      )}
    </div>
  );
};

export default CustomInput;
