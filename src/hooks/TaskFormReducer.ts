import { Reducer } from "react";
import { ITaskFormData } from "../types/task";

enum TaskActionTypes {
  CHANGE_TITLE = "change_title",
  CHANGE_DESCRIPTION = "change_description",
  CHANGE_DEADLINE = "change_date",
  CHANGE_FILE = "change_file",
  UPDATE_STATE = "update_state",
}

const INITIAL_STATE: ITaskFormData = {
  title: "",
  description: "",
  deadline: "",
  file: undefined,
};

interface ChangeFileAction {
  type: TaskActionTypes.CHANGE_FILE;
  payload: File | undefined;
}

interface ChangeInputAction {
  type:
    | TaskActionTypes.CHANGE_TITLE
    | TaskActionTypes.CHANGE_DESCRIPTION
    | TaskActionTypes.CHANGE_DEADLINE;
  payload: string;
}

interface UpdateStatePayload {
  title: string;
  description: string;
  deadline: string;
}

interface UpdateState {
  type: TaskActionTypes.UPDATE_STATE;
  payload: UpdateStatePayload;
}

type ReducerAction = ChangeFileAction | ChangeInputAction | UpdateState;

const taskFormReducer: Reducer<ITaskFormData, ReducerAction> = (
  state = INITIAL_STATE,
  action
): ITaskFormData => {
  switch (action.type) {
    case TaskActionTypes.CHANGE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case TaskActionTypes.CHANGE_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    case TaskActionTypes.CHANGE_DEADLINE:
      return {
        ...state,
        deadline: action.payload,
      };
    case TaskActionTypes.CHANGE_FILE:
      return {
        ...state,
        file: action.payload,
      };
    case TaskActionTypes.UPDATE_STATE:
      return {
        title: action.payload.title,
        description: action.payload.description,
        deadline: action.payload.deadline,
      };
    default:
      return {
        ...INITIAL_STATE,
      };
  }
};

export { taskFormReducer, INITIAL_STATE, TaskActionTypes };
