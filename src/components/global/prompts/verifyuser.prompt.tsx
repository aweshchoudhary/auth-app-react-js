import { Dialog, DialogContent } from "@/components/ui/dialog";
import VerifyOtp from "@/pages/auth/verify-otp/verify-otp";
import { PromptTypes } from "@/types/types";

const VerifyUserPrompt = ({ open, setOpen }: PromptTypes) => {
  return (
    <Dialog open={open}>
      <DialogContent className="md:p-10 py-10 px-5">
        <VerifyOtp setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default VerifyUserPrompt;
