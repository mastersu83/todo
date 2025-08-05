import { MyCalendar } from "@/src/components/Calendar";
import { AnimatePresence, motion } from "motion/react";
import React, { useRef, useState } from "react";
import { useClickAway } from "react-use";

interface IDataPicker {
  setSelectedDate: (selectedDate: Date) => void;
  selectedDate: Date;
}

export const MyDatePicker = ({
  setSelectedDate,
  selectedDate,
}: IDataPicker) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const ref = useRef(null);

  useClickAway(ref, () => {
    setShowDatePicker(!showDatePicker);
  });
  return (
    <div>
      <button
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="flex flex-col items-center justify-center text-sm px-3 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300"
      >
        📅
        <span className="text-xs">Выбор</span>
      </button>
      <AnimatePresence initial={false}>
        {showDatePicker ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key="box"
            ref={ref}
            className="absolute top-12 right-0 z-50 bg-white w-[80%] shadow-lg rounded-lg"
          >
            <MyCalendar
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
