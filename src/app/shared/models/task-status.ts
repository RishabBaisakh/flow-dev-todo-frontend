export type TaskStatus = 'ToDo' | 'InProgress' | 'Completed';

export const TaskStatusLabels: Record<TaskStatus, string> = {
  ToDo: 'To Do',
  InProgress: 'In Progress',
  Completed: 'Completed',
};

export const AllTaskStatuses: TaskStatus[] = ['ToDo', 'InProgress', 'Completed'];
