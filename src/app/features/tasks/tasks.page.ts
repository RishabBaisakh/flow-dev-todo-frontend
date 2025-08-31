import { Component, OnInit } from '@angular/core';
import { TasksStore } from '../../core/state/tasks.store';
import { TaskFormComponent } from './ui/task-form/task-form.component';
import { TaskListComponent } from './ui/task-list/task-list.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent, NgIf],
  templateUrl: './tasks.page.html',
})
export class TasksPage implements OnInit {
  constructor(public store: TasksStore) {}
  ngOnInit() {
    this.store.load();
  }
  onCreate(dto: any) {
    this.store.add(dto);
  }
  onChangeStatus(id: string, status: any) {
    this.store.setStatus(id, { status });
  }
}
