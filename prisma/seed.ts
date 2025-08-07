import { prisma } from "./prisma-client";

async function up() {
  const dreams = "Я летал над городом";

  await prisma.task.createMany({
    data: [
      {
        alarmTime: "2025-08-07T19:03:00.000Z",
        description: "",
        taskDate: "2025-08-07T19:33:00.000Z",
        title: "1",
      },
      {
        alarmTime: "2025-08-07T19:03:00.000Z",
        description: "",
        taskDate: "2025-08-07T19:33:00.000Z",
        title: "2",
      },
      {
        alarmTime: "2025-08-07T19:03:00.000Z",
        description: "",
        taskDate: "2025-08-07T19:33:00.000Z",
        title: "3",
      },
      {
        alarmTime: "2025-08-07T19:03:00.000Z",
        description: "",
        taskDate: "2025-08-07T19:33:00.000Z",
        title: "4",
      },
      {
        alarmTime: "2025-08-07T19:03:00.000Z",
        description: "",
        taskDate: "2025-08-07T19:33:00.000Z",
        title: "5",
      },
      {
        alarmTime: "2025-08-07T19:03:00.000Z",
        description: "",
        taskDate: "2025-08-07T19:33:00.000Z",
        title: "6",
      },
      {
        alarmTime: "2025-08-07T19:03:00.000Z",
        description: "",
        taskDate: "2025-08-07T19:33:00.000Z",
        title: "7",
      },
      {
        alarmTime: "2025-08-07T19:03:00.000Z",
        description: "",
        taskDate: "2025-08-07T19:33:00.000Z",
        title: "8",
      },
      {
        alarmTime: "2025-08-07T19:03:00.000Z",
        description: "",
        taskDate: "2025-08-07T19:33:00.000Z",
        title: "9",
      },
      {
        alarmTime: "2025-08-07T19:03:00.000Z",
        description: "",
        taskDate: "2025-08-07T19:33:00.000Z",
        title: "10",
      },
      {
        alarmTime: "2025-08-07T19:03:00.000Z",
        description: "",
        taskDate: "2025-08-07T19:33:00.000Z",
        title: "11",
      },
      {
        alarmTime: "2025-08-07T19:03:00.000Z",
        description: "",
        taskDate: "2025-08-07T19:33:00.000Z",
        title: "12",
      },
      {
        alarmTime: "2025-08-07T19:03:00.000Z",
        description: "",
        taskDate: "2025-08-07T19:33:00.000Z",
        title: "13",
      },
      {
        alarmTime: "2025-08-07T19:03:00.000Z",
        description: "",
        taskDate: "2025-08-07T19:33:00.000Z",
        title: "14",
      },
      {
        alarmTime: "2025-08-07T19:03:00.000Z",
        description: "",
        taskDate: "2025-08-07T19:33:00.000Z",
        title: "15",
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "task" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "task_type" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
