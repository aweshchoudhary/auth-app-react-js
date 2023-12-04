import UpdatePwdPrompt from "@/components/global/prompts/updatepwd.prompt";
import VerifyUserPrompt from "@/components/global/prompts/verifyuser.prompt";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { cn } from "@/lib/utils";
import { logOut } from "@/redux/features/auth.slice";
import { useGetMeQuery } from "@/redux/services/auth.api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mainApi } from "@/redux/services/root.api";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useGetMeQuery(null);
  const [isUpdatePwdPromptOpen, setUpdatePwdPromptOpen] = useState(false);
  const [isVerifyUserPromptOpen, setVerifyUserPromptOpen] = useState(false);

  const logoutUser = async () => {
    dispatch(mainApi.util.invalidateTags(["user"]));
    dispatch(logOut());
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="md:w-[40%] w-full md:p-10 p-5 md:border">
        <div>
          <h1 className="text-3xl font-bold mb-5">Users Detials</h1>
          <p className="truncate">number: {data?.number}</p>
          <p className="truncate">email: {data?.email}</p>
          <p className="truncate">
            Role: {data?.superuser ? "Super User" : "User"}
          </p>
        </div>
        <div className="mt-5 flex md:flex-row flex-col gap-3">
          <Button
            variant="destructive"
            className="flex-auto"
            onClick={logoutUser}
          >
            Logout
          </Button>
          {!data?.verified ? (
            <Button
              variant="outline"
              className="flex-auto"
              onClick={() => setVerifyUserPromptOpen(true)}
            >
              Verify
            </Button>
          ) : null}
          {data?.superuser ? (
            <Link
              to="/admin/users"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Manage Users
            </Link>
          ) : null}
          <Button
            variant="outline"
            className="flex-auto"
            onClick={() => setUpdatePwdPromptOpen(true)}
          >
            Change Password
          </Button>
        </div>
      </div>
      <UpdatePwdPrompt
        open={isUpdatePwdPromptOpen}
        setOpen={setUpdatePwdPromptOpen}
      />
      <VerifyUserPrompt
        open={isVerifyUserPromptOpen}
        setOpen={setVerifyUserPromptOpen}
      />
    </section>
  );
};

export default Home;
