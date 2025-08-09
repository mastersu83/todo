import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card, Flex } from "@radix-ui/themes";
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
      <Card className="w-2/3 h-1/5 backdrop-blur-sm">
        <Flex
          justify="center"
          align="center"
          className="w-full h-full font-bold text-lg"
        >
          <span>{errorMessage}</span>
        </Flex>
      </Card>
    </motion.div>
  );
};
