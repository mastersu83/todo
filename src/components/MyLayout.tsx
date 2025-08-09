import { Card, Flex } from "@radix-ui/themes";
import { ThemeSwitcher } from "@/src/components/ThemeSwitcher";
import { Providers } from "@/src/components/Providers";
import React from "react";

export const MyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <Flex align="center" justify="center" className="min-h-screen">
        <Card className="shadow-lg w-[430px] h-[90vh] pb-4 relative overflow-hidden overflow-y-auto">
          <ThemeSwitcher />
          <Flex justify="center">{children}</Flex>
        </Card>
      </Flex>
    </Providers>
  );
};
