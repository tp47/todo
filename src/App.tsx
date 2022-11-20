import { FC, useEffect, useState } from "react";

import TaskForm from "./components/TaskForm";
import { ITask } from "./types/task";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  QuerySnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";
import Task from "./components/Task";

const App: FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  useEffect(() => {
    const getTasksQuery = query(collection(db, "tasks"));
    const unsub = onSnapshot(getTasksQuery, (querySnapshot) => {
      let tasksArray: ITask[] = [];
      querySnapshot.forEach((doc) => {
        const { title, description, deadline, file, completed } = doc.data();
        tasksArray.push({
          id: doc.id,
          title,
          description,
          deadline,
          file,
          completed,
        });
      });
      setTasks(tasksArray);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const handleEdit = (task: ITask) => {
    setEditingTask(task);
  }

  const handleComplete = async (task: ITask) => {
    await updateDoc(doc(db, "tasks", task.id), {
      completed: !task.completed,
    })
  }

  return (
    <main className="flex items-center justify-center bg-purple-300 w-screen h-screen">
      <div className="w-5/6 h-5/6 bg-white rounded-xl p-3 flex flex-row">
        <TaskForm isEdit={editingTask ? true : false} task={editingTask} setTasks={setTasks} setEditingTask={setEditingTask} />
        <div className="flex flex-col gap-3 w-1/2 h-full overflow-scroll p-3">
          {tasks.map((task) => (
            <Task key={task.id} task={task} handleDelete={handleDelete} handleEdit={handleEdit} handleComplete={handleComplete}/>
          ))}
        </div>
      </div>
    </main>
  );
};

export default App;
