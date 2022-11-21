/**
 * Data from task form inputs type
 */
export interface ITaskFormData {
  title: string;
  description: string;
  deadline: string;
  file?: File | undefined;
}

/**
 * Task type
 */
export interface ITask {
  id?: string;
  title: string;
  description: string;
  deadline: string;
  file: string;
  completed: boolean;
}
