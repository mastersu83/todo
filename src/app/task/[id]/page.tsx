import { TaskPage } from "@/src/components/pages/TaskPage";
import { getOneTasks } from "@/src/service/taskApi";
import { formatDays } from "@/src/utils/utils";

interface IPage {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: IPage) => {
  const { id } = await params;
  const task = await getOneTasks(id);

  return <TaskPage task={task} />;
};

export default Page;
