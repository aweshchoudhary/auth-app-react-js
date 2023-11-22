import FormInput from "@/components/global/form.input";
import { Form, Formik } from "formik";
import { verifyOtpValues, verifyOtpSchema, VerifyOtpInterface } from "./utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import PageTransition from "@/components/global/page.transition";

const VerifyOtp = () => {
  const [isSuccess, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: VerifyOtpInterface) => {
    console.log(values);
    setSuccess(true);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User verified in successfully");
      setTimeout(() => navigate("/login"), 1000);
    }
  }, [isSuccess]);

  return (
    <PageTransition>
      <div className="w-full space-y-10">
        <div>
          <h1 className="text-3xl font-semibold">
            Enter your One Time Password
          </h1>
          <p className="text-gray-500 mt-2">
            We have sent you OTP on your email and phone number
          </p>
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
                {isSuccess ? (
                  <Button
                    type="button"
                    className={
                      "hover:bg-green-600 after:bg-green-800 text-white gap-2 overflow-hidden bg-green-600 w-full"
                    }
                  >
                    <Icon
                      icon="line-md:circle-to-confirm-circle-transition"
                      className="text-3xl"
                    />
                    <motion.span
                      initial={{ transform: "translateY(100px)" }}
                      animate={{ transform: "translateY(0)" }}
                      transition={{ duration: 0.5 }}
                      className="font-medium"
                    >
                      Verified
                    </motion.span>
                  </Button>
                ) : (
                  <Button className="w-full">Verify</Button>
                )}
              </div>
              <div className="mt-3 text-center">
                <p className="text-gray-500">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className={cn(
                      buttonVariants({
                        variant: "link",
                        className: "p-0 ml-2",
                      })
                    )}
                  >
                    Register
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </PageTransition>
  );
};

export default VerifyOtp;
