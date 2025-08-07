import React from "react";
import { HomePage } from "@/src/components/pages/HomePage";
import { Flex } from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex align="center" justify="center" className="min-h-screen">
      <HomePage />
    </Flex>
  );
}
