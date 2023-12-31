import { Dialog, DialogContent } from "@/components/ui/dialog";
import UpdatePwd from "../forms/update-pwd";
import { PromptTypes } from "@/types/types";

const UpdatePwdPrompt = ({ open, setOpen }: PromptTypes) => {
  return (
    <Dialog open={open}>
      <DialogContent className="md:p-10 py-10 px-5">
        <UpdatePwd setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePwdPrompt;
