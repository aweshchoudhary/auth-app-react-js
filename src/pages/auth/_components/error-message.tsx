import { Alert } from "@/components/ui/alert";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Alert variant="destructive">
          <div className="flex items-center gap-3">
            <Icon icon="fluent-mdl2:error" className="text-2xl" />
            <p>{message}</p>
          </div>
        </Alert>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorMessage;
