import { TaskPage } from "@/src/components/pages/TaskPage";
import { getOneTasks } from "@/src/service/taskApi";

interface IPage {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: IPage) => {
  const { id } = await params;
  const task = await getOneTasks(id);

  return <TaskPage task={task} taskId={id} />;
};

export default Page;
