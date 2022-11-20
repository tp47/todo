import { FC, FormEvent, useEffect, useReducer } from "react";
import { ITask } from "../types/task";

import useTask from "../hooks/task";
import {
  INITIAL_STATE,
  TaskActionTypes,
  taskFormReducer,
} from "../hooks/TaskFormReducer";
import FieldLabel from "./FieldLabel";
import Loading from "./Loading";

interface TaskFormProps {
  isEdit: boolean;
  setEditingTask: Function;
  setTasks: Function;
  task: ITask | null;
}

const TaskForm: FC<TaskFormProps> = ({
  isEdit,
  task,
  setTasks,
  setEditingTask,
}) => {
  const [formData, dispatch] = useReducer(taskFormReducer, INITIAL_STATE);
  const { createTask, updateTask, isLoading } = useTask();

  useEffect(() => {
    if (task) {
      dispatch({
        type: TaskActionTypes.UPDATE_STATE,
        payload: {
          title: task.title,
          description: task.description,
          deadline: task.deadline,
        },
      });
    }
  }, [task]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isEdit) {
      createTask(formData);
    } else {
      if (task) {
        const doc = await updateTask({
          ...formData,
          id: task.id,
          file: task.file,
          completed: task.completed,
        });
        setEditingTask(null);
      }
    }
    dispatch({
      type: TaskActionTypes.UPDATE_STATE,
      payload: {
        title: "",
        description: "",
        deadline: "",
      },
    });
  };

  return (
    <section className="w-1/2 overflow-scroll h-full p-2">
      {isLoading && <Loading />}
      <h2 className="mb-3 text-lg font-bold text-center">Создать задачу</h2>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
        <FieldLabel label="Заголовок">
          <input
            type="text"
            name="title"
            required={true}
            onChange={(event) =>
              dispatch({
                type: TaskActionTypes.CHANGE_TITLE,
                payload: event.target.value,
              })
            }
            value={formData.title}
            className="border-gray-300 border-2 p-2 rounded-lg"
            placeholder="Введите заголовок..."
          />
        </FieldLabel>
        <FieldLabel label="Описание">
          <textarea
            name="description"
            onChange={(event) =>
              dispatch({
                type: TaskActionTypes.CHANGE_DESCRIPTION,
                payload: event.target.value,
              })
            }
            value={formData.description}
            className="border-2 border-gray-300 p-2 rounded-lg"
            placeholder="Введите описание..."
          ></textarea>
        </FieldLabel>
        <FieldLabel label="Дата окончания">
          <input
            name="deadline"
            onChange={(event) =>
              dispatch({
                type: TaskActionTypes.CHANGE_DEADLINE,
                payload: event.target.value,
              })
            }
            value={formData.deadline}
            className="border-2 border-gray-300 p-2 rounded-lg"
            type="datetime-local"
          />
        </FieldLabel>
        <FieldLabel label="Файл">
          <input
            name="file"
            type="file"
            onChange={(event) =>
              dispatch({
                type: TaskActionTypes.CHANGE_FILE,
                payload: event.target.files?.[0],
              })
            }
            disabled={isEdit ? true : false}
          />
        </FieldLabel>
        <button
          className="w-full border-2 border-green-200 hover:bg-white p-2 bg-green-200 rounded-lg"
          type="submit"
        >
          {!isEdit ? "Создать" : "Изменить"}
        </button>
      </form>
    </section>
  );
};

export default TaskForm;
