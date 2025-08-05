import { prisma } from "./prisma-client";

async function up() {
  const dreams = "Я летал над городом";

  await prisma.taskType.createMany({
    data: [
      {
        name: "Работа",
      },
      {
        name: "Дом",
      },
      {
        name: "Личное",
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
