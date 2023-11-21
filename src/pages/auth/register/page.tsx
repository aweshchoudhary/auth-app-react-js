import FormInput from "@/components/global/form.input";
import { Form, Formik } from "formik";
import { newUserInitalValues, newUserSchema, NewUserInterface } from "./utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useRegisterMutation } from "@/redux/services/auth.api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { RegisterReqData } from "@/types/types";
import SuccessModal from "./success.modal";
import ErrorMessage from "../_components/error-message";
import { Icon } from "@iconify/react/dist/iconify.js";

const Register = () => {
  const [registerUser, { isLoading, isSuccess, isError, error, data }] =
    useRegisterMutation();
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (values: NewUserInterface) => {
    const formatedValues: RegisterReqData = {
      user: {
        number: values.number,
        email: values.email,
      },
      password: {
        password: values.password,
        password2: values.password2,
      },
    };
    await registerUser(formatedValues);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("User registered successfully");
      setTimeout(() => navigate("/verify-otp", { replace: true }), 2000);
    }
    if (isError) {
      let errData: any = error;
      switch (errData?.status) {
        case 409:
          setErrMessage("User already exist");
          break;

        default:
          setErrMessage("Something went wrong! Try again.");
          break;
      }
    }
  }, [isSuccess, isError]);

  return isSuccess ? (
    <SuccessModal email={data?.email ?? "test@gmail.com"} />
  ) : (
    <div className="w-full space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-primary">
          Create a new Account
        </h1>
        <p className="text-gray-500 mt-2">Enter your details for new account</p>
      </div>
      {isError ? <ErrorMessage message={errMessage} /> : null}
      <Formik
        initialValues={newUserInitalValues}
        validationSchema={newUserSchema}
        onSubmit={(values: NewUserInterface) => handleSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form autoComplete="off">
            <div className="space-y-5 w-full">
              <FormInput
                errors={errors}
                touched={touched}
                name="number"
                title="Mobile Number"
                icon="ph:phone-thin"
                inputProps={{ disabled: isLoading, type: "number" }}
              />
              <FormInput
                errors={errors}
                touched={touched}
                name="email"
                title="Email"
                icon="ph:envelope-simple-thin"
                inputProps={{
                  disabled: isLoading,
                  type: "email",
                }}
              />
              <FormInput
                errors={errors}
                touched={touched}
                name="password"
                title="New Password"
                icon="material-symbols-light:lock-outline"
                inputProps={{
                  disabled: isLoading,
                  type: "password",
                }}
              />
              <FormInput
                errors={errors}
                touched={touched}
                name="password2"
                title="Confirm Password"
                icon="material-symbols-light:lock-outline"
                inputProps={{
                  disabled: isLoading,
                  type: "password",
                }}
              />
            </div>
            <div className="mt-8">
              <Button disabled={isLoading} type="submit" className="w-full">
                {!isLoading ? (
                  "Register"
                ) : (
                  <span>
                    <Icon
                      icon="svg-spinners:90-ring-with-bg"
                      className="text-3xl"
                    />
                  </span>
                )}
              </Button>
            </div>
            <div className="mt-3 text-center">
              <p className="text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className={cn(
                    buttonVariants({
                      variant: "link",
                      className: "p-0 ml-2",
                    })
                  )}
                >
                  Login
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
