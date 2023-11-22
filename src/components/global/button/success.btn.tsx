import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { HtmlHTMLAttributes, ReactNode } from "react";

type Props = {
  btnProps?: HtmlHTMLAttributes<HTMLButtonElement>;
  children: ReactNode;
};

const SuccessBtn = ({ btnProps, children }: Props) => {
  return (
    <Button
      className={
        "hover:bg-green-600 after:bg-green-800 text-white gap-2 overflow-hidden bg-green-600 w-full"
      }
      type="button"
      disabled
      {...btnProps}
    >
      <Icon
        icon="line-md:circle-to-confirm-circle-transition"
        className="text-3xl"
      />
      <motion.span
        initial={{ transform: "translateY(100px)" }}
        animate={{ transform: "translateY(0)" }}
        transition={{ duration: 0.5 }}
        className="font-medium"
      >
        {children}
      </motion.span>
    </Button>
  );
};

export default SuccessBtn;
