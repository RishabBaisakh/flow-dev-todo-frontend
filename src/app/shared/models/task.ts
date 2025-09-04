import { TaskStatus } from './task-status';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedUserId: string;
  createdAt?: string;
  assignedUser?: any;
}

export interface PaginatedResponse {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalTasks: number;
  tasks: Task[];
}

export interface CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
  assignedUserId: string;
}

export interface UpdateTaskStatusDto {
  status: TaskStatus;
}
