import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import UpdatePwd from "../forms/update-pwd";

type Props = {
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

const UpdatePwdPrompt = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open}>
      <DialogContent className="md:p-10 py-10 px-5">
        <UpdatePwd setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePwdPrompt;
