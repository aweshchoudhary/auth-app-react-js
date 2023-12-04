import FormInput from "@/components/global/form.input";
import { Form, Formik } from "formik";
import { verifyOtpValues, verifyOtpSchema, VerifyOtpInterface } from "./utils";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  useGetOtpQuery,
  useVerifyOtpMutation,
} from "@/redux/services/auth.api";
import { PromptTypes } from "@/types/types";
import SuccessBtn from "@/components/global/button/success.btn";

const VerifyOtp = ({ setOpen }: Omit<PromptTypes, "open">) => {
  const getOptStatus = useGetOtpQuery(null);
  const [verifyOtp, verifyOtpStatus] = useVerifyOtpMutation();

  const handleSubmit = async (values: VerifyOtpInterface) => {
    verifyOtp(values);
  };
  const handleCancel = () => {
    setOpen && setOpen(false);
  };

  useEffect(() => {
    if (verifyOtpStatus.isSuccess) {
      toast.success("User verified in successfully");
      handleCancel();
    }
    if (verifyOtpStatus.isError) {
      toast.error("User already verified");
      setTimeout(() => handleCancel(), 500);
    }
  }, [verifyOtpStatus.isSuccess, verifyOtpStatus.isError]);

  return (
    <div className="w-full space-y-10">
      <div>
        <h1 className="text-2xl font-semibold">Enter your One Time Password</h1>
        <p className="text-gray-500 mt-2">
          We have sent you OTP on your email and phone number
        </p>
        {getOptStatus.data?.otp && <p>Otp: {getOptStatus.data.otp}</p>}
      </div>
      <Formik
        initialValues={verifyOtpValues}
        validationSchema={verifyOtpSchema}
        onSubmit={(values: VerifyOtpInterface) => handleSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form autoComplete="off" className="w-full">
            <div className="space-y-5 w-full">
              <FormInput
                errors={errors}
                touched={touched}
                name="otp"
                title="6 Digit Otp"
                icon="material-symbols-light:lock-outline"
                inputProps={{ type: "number" }}
              />
            </div>
            <div className="mt-8">
              {verifyOtpStatus.isSuccess ? (
                <SuccessBtn>Verified</SuccessBtn>
              ) : (
                <div className="flex gap-3">
                  <Button type="submit" className="w-2/3">
                    Verify
                  </Button>
                  <Button
                    onClick={handleCancel}
                    type="button"
                    variant="outline"
                    className="flex-auto"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VerifyOtp;
