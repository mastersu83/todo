import { Flex } from "@radix-ui/themes";
import React from "react";

interface ITodayDate {
  todayTask: { dayName: string; dayNumber: string; monthName: string };
}

export const TodayDate = ({ todayTask }: ITodayDate) => {
  return (
    <Flex
      gapX="8px"
      align="center"
      justify="center"
      className="p-1 px-2 border border-gray-200 rounded-md shadow-md mt-1"
    >
      <h1 className="text-lg">Список дел на:</h1>
      <p className="text-lg font-bold">
        {todayTask.dayName}{" "}
        <span className="text-lg font-bold">
          {todayTask.dayNumber} {todayTask.monthName}
        </span>
      </p>
    </Flex>
  );
};
