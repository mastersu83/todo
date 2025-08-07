"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ThemeSwitcher } from "@/src/components/ThemeSwitcher";
import { motion } from "motion/react";
import { PlusIcon } from "lucide-react";

interface IHeader {
  setAddTaskAction: (addTask: boolean) => void;
}

export const Header = ({ setAddTaskAction }: IHeader) => {
  const today = new Date();
  const [isHoveredTrash, setIsHoveredTrash] = useState(false);

  const dayName = format(today, "EEEE", { locale: ru });
  const dayNumber = format(today, "d", { locale: ru });
  const monthName = format(today, "LLLL", { locale: ru });
  return (
    <header className="flex justify-between items-center p-2">
      <div>
        <p className="text-lg">
          {dayName}{" "}
          <span className="font-semibold">
            {dayNumber} {monthName}
          </span>
        </p>
      </div>
      <ThemeSwitcher />
      <motion.div
        onHoverStart={() => setIsHoveredTrash(true)}
        onHoverEnd={() => setIsHoveredTrash(false)}
      >
        <button
          onClick={() => setAddTaskAction(true)}
          className="rounded-full w-14 h-14 flex justify-center items-center text-3xl shadow-xl border border-gray-200 cursor-pointer"
        >
          <motion.p
            animate={{
              rotate: isHoveredTrash ? [0, 10, -10, 0] : 0,
              scale: isHoveredTrash ? 1.5 : 1,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <PlusIcon />
          </motion.p>
        </button>
      </motion.div>
    </header>
  );
};
