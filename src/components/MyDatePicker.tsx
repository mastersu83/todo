import { MyCalendar } from "@/src/components/Calendar";
import { AnimatePresence, motion } from "motion/react";
import React, { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { Calendar1 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface IDataPicker {
  setSelectedDate: (selectedDate: Date) => void;
  selectedDate: Date;
}

export const MyDatePicker = ({
  setSelectedDate,
  selectedDate,
}: IDataPicker) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme, systemTheme } = useTheme();

  const ref = useRef(null);

  useClickAway(ref, () => {
    setShowDatePicker(!showDatePicker);
  });
  return (
    <>
      <button
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="flex flex-col items-center justify-center px-3 py-2 rounded-xl hover:text-gray-700 hover:bg-gray-300 border border-gray-300 cursor-pointer shadow-md"
      >
        <Calendar1 />
        <span className="text-xs font-bold">Выбор</span>
      </button>
      <AnimatePresence initial={false}>
        {showDatePicker ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key="box"
            ref={ref}
            className={cn(
              theme === "dark" || (theme === "system" && systemTheme === "dark")
                ? "bg-black/70"
                : theme === "light" ||
                  (theme === "system" && systemTheme === "light")
                ? "bg-white/50"
                : "",
              "absolute top-12 right-0 backdrop-blur-md z-50 w-[90%] shadow-lg rounded-xl px-4 pt-2"
            )}
          >
            <MyCalendar
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};
