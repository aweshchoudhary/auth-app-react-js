import * as yup from "yup";

export interface LoginUserInterface {
  username: string;
  password: string;
  grant_type: string;
}

export const loginUserIntitialValues: LoginUserInterface = {
  username: "",
  password: "",
  grant_type: "password",
};

export const loginUserSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
