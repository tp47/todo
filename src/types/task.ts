export interface ITaskFormData {
  title: string;
  description: string;
  deadline: string;
  file?: File | undefined;
}

export interface ITask {
  id?: string;
  title: string;
  description: string;
  deadline: string;
  file: string;
  completed: boolean;
}
