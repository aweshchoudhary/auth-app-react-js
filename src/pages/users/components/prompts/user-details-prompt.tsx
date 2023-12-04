import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserInterface } from "@/types/types";
import UserDetails from "./user-details";
import { Dispatch, SetStateAction } from "react";

const UserDetailsPrompt = ({
  open,
  setOpen,
  userDetails,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userDetails: UserInterface;
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="md:p-10 py-10 px-5">
        <UserDetails user={userDetails} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsPrompt;
