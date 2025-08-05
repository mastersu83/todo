import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card, Text } from "@radix-ui/themes";

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
    setTimeout(() => setErrorMessage(null), 5000);
  }, [errorMessage]);
  return (
    <Card
      className={cn(
        !!errorMessage ? "opacity-100" : "opacity-0 hidden",
        "shadow-xl z-20 bg-accent-9 rounded-lg",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <Text>Внимание!!!</Text>
        <Text color="red" weight="bold" size="3" align="center">
          {errorMessage}
        </Text>
      </div>
    </Card>
  );
};
