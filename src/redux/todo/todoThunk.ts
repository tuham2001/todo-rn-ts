import { getTask } from './todoRedux';

export function addTask(task: any) {
  return function AddTask(dispatch: any, getState: any) {
    const { taskList } = getState().user.todoReducer;
    dispatch(getTask(taskList.concat([task])));
  };
}

export function deleteTask() {
  return function DeleteTask(dispatch: any, getState: any) {
    const { taskList } = getState().user.todoReducer;
    const newTaskList = taskList.filter((item: any) => item.isChecked !== true);
    dispatch(getTask(newTaskList));
  };
}

export function checkTask(newTask: any) {
  return function CheckTask(dispatch: any, getState: any) {
    const { taskList } = getState().user.todoReducer;
    const newTaskList = [...taskList]
    newTaskList.map((task: any, index: number) => {
      if (task.id === newTask.id) {
        newTaskList[index] = newTask;
        dispatch(getTask(newTaskList));
      }
    });
  };
}

export function updateTask(newTask: any) {
  return function UpdateTask(dispatch: any, getState: any) {
    const { taskList } = getState().user.todoReducer;
    const newTaskList = [...taskList]
    newTaskList.map((task: any, index: number) => {
      if (task.id === newTask.id) {
        newTaskList[index] = newTask;
        dispatch(getTask(newTaskList));
      }
    });
  };
}
