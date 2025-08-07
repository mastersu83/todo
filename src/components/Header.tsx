"use client";

import React from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Card } from "@radix-ui/themes";

export const Header = () => {
  const today = new Date();

  const dayName = format(today, "EEEE", { locale: ru });
  const dayNumber = format(today, "d", { locale: ru });
  const monthName = format(today, "LLLL", { locale: ru });
  return (
    <header className="flex justify-between p-1">
      <Card className="shadow-lg bg-blue-200 border-blue-300 text-black">
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
