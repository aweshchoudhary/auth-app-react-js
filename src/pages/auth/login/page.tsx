import FormInput from "@/components/global/form.input";
import { Form, Formik } from "formik";
import {
  loginUserIntitialValues,
  loginUserSchema,
  LoginUserInterface,
} from "./utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/services/auth.api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { setCredentials } from "@/redux/features/auth.slice";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import ErrorMessage from "../_components/error-message";
import PageTransition from "@/components/global/page.transition";

const Login = () => {
  const [loginUser, { isLoading, isSuccess, isError, error }] =
    useLoginMutation();
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: LoginUserInterface) => {
    const formdata: any = new FormData();
    formdata.append("username", values.username);
    formdata.append("password", values.password);
    formdata.append("grant_type", values.grant_type);
    const res: any = await loginUser(formdata);
    dispatch(setCredentials({ accessToken: res.data.access_token }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User logged in successfully");
      navigate("/");
    }
    if (isError) {
      let errData: any = error;
      if (errData?.status && errData.status === 500)
        setErrMessage("Something went wrong! Try again.");
      else setErrMessage("Incorrect Username or Password");
    }
  }, [isSuccess, isError]);

  return (
    <PageTransition>
      <div className="w-full transition-all space-y-10">
        <div>
          <h1 className="text-3xl font-semibold text-primary">
            Log in with your Account
          </h1>
          <p className="text-gray-500 mt-2">
            welcome back, log in with your account
          </p>
        </div>
        {isError ? <ErrorMessage message={errMessage} /> : null}
        <Formik
          initialValues={loginUserIntitialValues}
          validationSchema={loginUserSchema}
          onSubmit={(values: LoginUserInterface) => handleSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="space-y-5 w-full">
                <FormInput
                  name="username"
                  title="Username"
                  icon="circum:user"
                  errors={errors}
                  touched={touched}
                  inputProps={{ disabled: isLoading }}
                />
                <FormInput
                  name="password"
                  title="Password"
                  icon="material-symbols-light:lock-outline"
                  errors={errors}
                  touched={touched}
                  inputProps={{ disabled: isLoading, type: "password" }}
                />
              </div>
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center gap-3">
                  <Checkbox id="remember-me" />
                  <Label htmlFor="remember-me">Remember Me</Label>
                </div>
                <Link
                  to="/login"
                  className={cn(
                    buttonVariants({ variant: "link", className: "p-0" })
                  )}
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="mt-8">
                <Button disabled={isLoading} type="submit" className="w-full">
                  {!isLoading ? (
                    "Login"
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

export default Login;
