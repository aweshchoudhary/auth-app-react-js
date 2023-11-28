import { Textarea } from "@/components/ui/textarea";
import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import CustomInput from "./custom.input";
import { ErrorMessage, FormikErrors, FormikTouched } from "formik";
import { Icon } from "@iconify/react/dist/iconify.js";

interface FormInputProps {
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  title: string;
  name: string;
  textarea?: boolean;
  icon?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  as?: ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  title,
  errors,
  touched,
  name,
  textarea,
  inputProps,
  textareaProps,
  icon,
  as,
}) => {
  return (
    <div className="w-full">
      {textarea ? (
        <Textarea
          id={name}
          name={name}
          placeholder={title}
          {...textareaProps}
        />
      ) : (
        <CustomInput
          name={name}
          title={title}
          inputProps={inputProps}
          icon={icon}
          error={errors[name]}
          touched={touched[name]}
          as={as}
        />
      )}
      {errors[name] && touched[name] ? (
        <div className="mt-2 text-red-600 text-sm flex items-center gap-1">
          <Icon icon="ic:round-error" className="text-xl" />
          <ErrorMessage name={name} />
        </div>
      ) : null}
    </div>
  );
};

export default FormInput;
