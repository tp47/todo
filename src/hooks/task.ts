import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { db, storage } from "../firebase.config";
import type { ITaskFormData, ITask } from "../types/task";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

const useTask = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createTask = async (task: ITaskFormData) => {
    setIsLoading(true);

    const { file } = task;
    if (file) {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //const percent = Math.round(
          //(snapshot.bytesTransferred / snapshot.totalBytes) * 100
          //);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            const doc = await insertTask({ ...task, file: url, completed: false });
            setIsLoading(false);
            return doc;
          });
        }
      );
    } else {
      const doc = await insertTask({ ...task, file: "", completed: false });
      setIsLoading(false);
      return doc;
    }
  };

  const insertTask = async (task: ITask) => {
    const docRef = await addDoc(collection(db, "tasks"), {
      ...task,
    });

    return {...task, id: docRef.id};
  };

  const updateTask = async (task: ITask) => {
    setIsLoading(true);
    const { title, description, deadline } = task;
    await updateDoc(doc(db, "tasks", task.id), {
      title,
      description,
      deadline,
    });
    setIsLoading(false);

    return task;
  };

  return {
    createTask,
    updateTask,
    isLoading,
  };
};

export default useTask;
