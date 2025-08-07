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
import React from "react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
  const { setTheme, theme, systemTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer flex absolute top-5 right-25">
        <SettingsIcon />
      </PopoverTrigger>
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
