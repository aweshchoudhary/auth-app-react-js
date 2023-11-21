import * as yup from "yup";

export interface NewUserInterface {
  number: string;
  email: string;
  password: string;
  password2: string;
}

export const newUserInitalValues: NewUserInterface = {
  number: "",
  email: "",
  password: "",
  password2: "",
};

export const newUserSchema = yup.object().shape({
  number: yup.string().min(12).required("Mobile number is required"),
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
      "Password must contain at least 1 number & 1 special character"
    )
    .required("Password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords not matched")
    .required("Confirm Password is required"),
});
