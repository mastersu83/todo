import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Flex } from "@radix-ui/themes";
import { motion } from "motion/react";

interface CustomToastProps {
  errorMessage: string | null;
  setErrorMessage: (value: null) => void;
  className: string;
}

export const CustomToast = ({
  errorMessage,
  setErrorMessage,
  className,
}: CustomToastProps) => {
  useEffect(() => {
    setTimeout(() => setErrorMessage(null), 3000);
  }, [errorMessage]);
  return (
    <motion.div
      className={cn(
        !!errorMessage ? "opacity-100 visible" : "opacity-0 invisible",
        "flex items-center justify-center shadow-xl z-20 bg-black/30 rounded-lg p-4 border w-full h-full transition duration-300 ease-in-out",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center w-2/3 h-1/5 bg-white rounded-lg">
        <span color="red">{errorMessage}</span>
      </div>
    </motion.div>
  );
};
