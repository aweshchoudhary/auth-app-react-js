import UpdatePwdPrompt from "@/components/global/prompts/updatepwd.prompt";
import VerifyUserPrompt from "@/components/global/prompts/verifyuser.prompt";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import { logOut, selectCurrentToken } from "@/redux/features/auth.slice";
import { useGetMeQuery } from "@/redux/services/auth.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);
  const { data } = useGetMeQuery(null);
  const [isUpdatePwdPromptOpen, setUpdatePwdPromptOpen] = useState(false);
  const [isVerifyUserPromptOpen, setVerifyUserPromptOpen] = useState(false);

  const logoutUser = () => {
    dispatch(logOut());
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="md:w-[40%] w-full md:p-10 p-5 border">
        <div>
          <h1 className="text-3xl font-bold mb-5">Users Detials</h1>
          <p className="truncate">number: {data?.number}</p>
          <p className="truncate">email: {data?.email}</p>
        </div>
        <div className="mt-5 flex gap-3">
          <Button
            variant="destructive"
            className="flex-auto"
            onClick={logoutUser}
          >
            Logout
          </Button>
          <Button
            variant="outline"
            className="flex-auto"
            onClick={() => setVerifyUserPromptOpen(true)}
          >
            Verify
          </Button>
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
