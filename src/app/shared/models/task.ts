import { TaskStatus } from './task-status';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedUser: string;
  createdAt?: string;
}

export interface PaginatedResponse {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalTasks: number;
  tasks: Task[];
}

// TODO: think more if we want to add Status while creating, because we can set it as default
// Every todo item should begin with a default while creation
export interface CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
  assignedUser: string;
}

export interface UpdateTaskStatusDto {
  status: TaskStatus;
}
