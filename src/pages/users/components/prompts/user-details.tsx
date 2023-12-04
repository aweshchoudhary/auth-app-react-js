import { Button } from "@/components/ui/button";
import { useMakeSuperUserMutation } from "@/redux/services/users.api";
import { UserInterface } from "@/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";

const UserDetails = ({
  setOpen,
  user,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: UserInterface;
}) => {
  const [makeSuperUser, { isLoading, isSuccess }] = useMakeSuperUserMutation();

  const handleToggleSuperUser = async () => {
    user &&
      (await makeSuperUser({
        email: user.email,
        number: user.number,
        superuser: !user.superuser,
      }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        `${user.email} is now a ${user.superuser ? null : "Super"} User`
      );
      setOpen(false);
    }
  }, [isSuccess]);
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mb-5">Users Detials</h1>
        <div className="mt-3 space-y-2 text-lg">
          <p className="truncate">Number: {user?.number}</p>
          <p className="truncate">Email: {user?.email}</p>
          <p className="truncate">
            Role: {user?.superuser ? "Super User" : "User"}
          </p>
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <Button
          variant={user?.superuser ? "destructive" : "default"}
          className="flex-auto"
          onClick={handleToggleSuperUser}
        >
          {!isLoading && user?.superuser ? "Make User" : "Make Super User"}
          {isLoading && (
            <span>
              <Icon icon="svg-spinners:90-ring-with-bg" className="text-3xl" />
            </span>
          )}
        </Button>
        <Button variant={"outline"} onClick={() => setOpen(false)}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default UserDetails;
