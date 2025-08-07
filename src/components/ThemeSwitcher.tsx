import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Settings2Icon, SettingsIcon } from "lucide-react";
import { Flex } from "@radix-ui/themes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import sun from "@/public/images/sun.png";
import moon from "@/public/images/moon.png";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

export const ThemeSwitcher = () => {
  const { setTheme, theme, systemTheme } = useTheme();

  const [isHoveredEdit, setIsHoveredEdit] = useState(false);

  return (
    <Popover>
      <motion.div
        animate={{
          scale: isHoveredEdit ? 1.5 : 1,
        }}
        transition={{
          duration: 0.5,
        }}
        onHoverStart={() => setIsHoveredEdit(true)}
        onHoverEnd={() => setIsHoveredEdit(false)}
      >
        <PopoverTrigger className="cursor-pointer">
          <SettingsIcon />
        </PopoverTrigger>
      </motion.div>
      <PopoverContent className="flex flex-col w-50 gap-y-2">
        <span className="text-center text-xl font-bold">Тема</span>
        <Flex
          gap="10px"
          className={cn(
            theme === "light" ? "bg-gray-200" : "",
            "cursor-pointer p-1 rounded-lg"
          )}
          onClick={() => setTheme("light")}
        >
          <Image width={24} height={24} src={sun} alt="sun" />
          Светлая
        </Flex>
        <Flex
          gap="10px"
          className={cn(
            theme === "dark" ? "bg-gray-200 text-black" : "",
            "cursor-pointer p-1 rounded-lg"
          )}
          onClick={() => setTheme("dark")}
        >
          <Image width={24} height={24} src={moon} alt="sun" />
          Тёмная
        </Flex>
        <Flex
          gap="10px"
          className={cn(
            theme === "system" && systemTheme === "dark"
              ? "bg-gray-200 text-black"
              : theme === "system" && systemTheme === "light"
              ? "bg-gray-200"
              : "",
            "cursor-pointer p-1 rounded-lg"
          )}
          onClick={() => setTheme("system")}
        >
          <Settings2Icon />
          Системная
        </Flex>
      </PopoverContent>
    </Popover>
  );
};
