import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PageTransition = ({ children }: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0.5, y: "15vh" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
