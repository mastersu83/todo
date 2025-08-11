import React from "react";
import ToDoList from "@/src/components/ToDoList";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const HomePage = () => {
  return (
    <>
      <ToDoList />

      <Link href="/add-task">
        <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-full w-14 h-14 flex justify-center items-center text-3xl text-black shadow-xl border border-blue-200 bg-blue-100 cursor-pointer">
          <PlusIcon />
        </button>
      </Link>
    </>
  );
};
