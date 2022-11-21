import { FC } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

import { ITask } from "../types/task";

/*
 * Properties types for Task Component
 */
export interface TaskProps {
  task: ITask;
  handleDelete: Function;
  handleEdit: Function;
  handleComplete: Function;
}

/**
 * Task component
 * @category Component
 */
const Task: FC<TaskProps> = ({
  task,
  handleDelete,
  handleEdit,
  handleComplete,
}) => {
  const deadline = dayjs(task.deadline, "YYYY-MM-DDTHH:mm");
  const currentDate = new Date();
  return (
    <div
      className={`${
        task.completed
          ? "opacity-20 bg-green-200"
          : currentDate.getTime() > deadline.valueOf()
          ? "opacity-20 bg-red-200"
          : ""
      } flex flex-col p-3 rounded-lg shadow-md gap-2`}
    >
      <h3 className="font-bold">{task.title}</h3>
      {task.description && (
        <div className="text-sm">Описание: {task.description}</div>
      )}
      {task.deadline && (
        <span className="text-sm">
          Крайний срок: {deadline.format("DD.MM.YYYY HH:mm")}
        </span>
      )}
      {task.file && (
        <a href={task.file} target="_blank" rel="noreferrer">
          Прикрепленый файл
        </a>
      )}
      <div className="flex flex-row items-center justify-start gap-2">
        <button onClick={() => handleEdit(task)} type="button">
          <EditIcon />
        </button>
        <button onClick={() => handleComplete(task)} type="button">
          <CheckIcon />
        </button>
        <button onClick={() => handleDelete(task.id)} type="button">
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default Task;
