import { useUpdatePassMutation } from "@/redux/services/auth.api";
import { UpdatePassReqData } from "@/types/types";
import { Form, Formik } from "formik";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import FormInput from "@/components/global/form.input";
import { Button } from "@/components/ui/button";

export const updatePassInitalValues: UpdatePassReqData = {
  current_password: "",
  password: "",
  password2: "",
};

export const updatePassSchema = yup.object().shape({
  current_password: yup.string().required("Enter your current password"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
      "Password must contain at least 1 number and 1 special character"
    )
    .required("Enter your new password"),
  password2: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords not matched")
    .required("Confirm Password is required"),
});

const UpdatePwd = ({
  setOpen,
}: {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [update, { isLoading, isSuccess, isError }] = useUpdatePassMutation();

  const navigate = useNavigate();

  const handleSubmit = async (values: UpdatePassReqData) => {
    await update(values);
  };
  const handleCancel = async () => {
    setOpen && setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password Changed Successfully");
      setTimeout(() => navigate("/verify-otp", { replace: true }), 2000);
    }
    if (isError) toast.error("Something went wrong! Try again.");
  }, [isSuccess, isError]);
  return (
    <Formik
      initialValues={updatePassInitalValues}
      validationSchema={updatePassSchema}
      onSubmit={(values: UpdatePassReqData) => handleSubmit(values)}
    >
      {({ errors, touched }) => (
        <Form autoComplete="off">
          <div className="md:space-y-10 space-y-5">
            <div>
              <h1 className="md:text-3xl text-2xl font-bold">
                Update Your Password
              </h1>
            </div>
            <div className="space-y-5">
              <FormInput
                errors={errors}
                touched={touched}
                name="current_password"
                title="Current Password"
                icon="material-symbols-light:lock-outline"
                inputProps={{ type: "password" }}
              />
              <FormInput
                errors={errors}
                touched={touched}
                name="password"
                title="New Password"
                icon="material-symbols-light:lock-outline"
                inputProps={{ type: "password" }}
              />
              <FormInput
                errors={errors}
                touched={touched}
                name="password2"
                title="Confirm Password"
                icon="material-symbols-light:lock-outline"
                inputProps={{ type: "password" }}
              />
            </div>
            <div className="flex gap-3">
              <Button disabled={isLoading} type="submit" className="flex-auto">
                {isLoading ? "Changing..." : "Update"}
              </Button>
              <Button
                disabled={isLoading}
                type="button"
                variant="outline"
                className="flex-auto"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePwd;
