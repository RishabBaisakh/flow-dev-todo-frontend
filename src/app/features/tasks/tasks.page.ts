import { Component, OnInit } from '@angular/core';
import { TasksStore } from '../../core/state/tasks.store';
import { TaskFormComponent } from './ui/task-form.component';
import { TaskListComponent } from './ui/task-list.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent, NgFor, NgIf],
  template: `
    <section style="max-width:800px;margin:2rem auto;padding:1rem;">
      <h1>To-Do</h1>
      <app-task-form (create)="onCreate($event)"></app-task-form>

      <ng-container *ngIf="store.loading(); else list">
        <p>Loading…</p>
      </ng-container>
      <ng-template #list>
        <app-task-list
          [tasks]="store.tasks()"
          (changeStatus)="onChangeStatus($event.id, $event.status)"
        >
        </app-task-list>
      </ng-template>
    </section>
  `,
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
