import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET(req: NextRequest) {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: "asc" } });

  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const { title, description, status, taskDate, alarmTime } = await req.json();

  const category = await prisma.task.create({
    data: { title, description, status, taskDate, alarmTime },
  });
  return NextResponse.json({ title, description, status, taskDate, alarmTime });
}

export async function PATCH(req: NextRequest) {
  const { title, description, status, id, taskDate, alarmTime } =
    await req.json();

  console.log({ title, description, status, id, taskDate, alarmTime });

  const tasks = await prisma.task.update({
    where: { id },
    data: {
      title,
      description,
      status,
      taskDate,
      alarmTime,
    },
  });
  return NextResponse.json(tasks);
}

export async function DELETE(req: NextRequest) {
  const id = await req.json();

  console.log(id);

  const tasks = await prisma.task.delete({
    where: { id },
  });
  return NextResponse.json(tasks);
}
