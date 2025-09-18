import { AddTask } from "@/src/components/AddTask";

interface IPage {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: IPage) => {
  const { id } = await params;
  return <AddTask editTaskId={id} />;
};

export default Page;
