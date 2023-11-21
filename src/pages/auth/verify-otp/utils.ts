import * as yup from "yup";

export interface VerifyOtpInterface {
  otp: string;
}

export const verifyOtpValues: VerifyOtpInterface = {
  otp: "",
};

export const verifyOtpSchema = yup.object().shape({
  otp: yup
    .string()
    .min(6, "OTP must be of 6 digits")
    .max(6, "OTP must be of 6 digits")
    .required("Enter your otp"),
});
