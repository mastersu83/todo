"use client";

import React from "react";
import { Card } from "@radix-ui/themes";
import { formatDays } from "@/src/utils/utils";

export const Header = () => {
  const { dayName, dayNumber, monthName } = formatDays();

  return (
    <header className="flex justify-center p-1">
      <Card className="shadow-md w-full">
        Сегодня
        <p className="text-lg">
          {dayName}{" "}
          <span className="font-semibold">
            {dayNumber} {monthName}
          </span>
        </p>
      </Card>
    </header>
  );
};
