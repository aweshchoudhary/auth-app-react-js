import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";

const SuccessModal = ({ email }: { email: string }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ transform: "translateY(15vh)" }}
        animate={{ transform: "translateY(0)" }}
        className="w-full rounded-md  flex items-center justify-center space-y-10"
      >
        <div className="text-center">
          <div className="text-green-600">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="md:mb-5 mb-3"
            >
              <Icon
                icon="ep:success-filled"
                className="mx-auto mb-3"
                height={120}
              />
            </motion.div>
            <h1 className="text-3xl font-semibold">Registration Successful</h1>
            <p className="text-xl">{email}</p>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-5  flex items-center justify-center gap-3 md:text-lg font-medium"
          >
            <Icon icon="svg-spinners:180-ring-with-bg" className="text-2xl" />
            Redirecting
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuccessModal;
