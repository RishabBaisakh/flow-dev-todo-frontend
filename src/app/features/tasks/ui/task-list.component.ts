import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Task } from '../../../shared/models/task';
import { AllTaskStatuses, TaskStatus, TaskStatusLabels } from '../../../shared/models/task-status';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <ul *ngIf="tasks?.length; else empty" style="list-style:none;padding:0;display:grid;gap:.75rem">
      <li
        *ngFor="let t of tasks; trackBy: trackById"
        style="border:1px solid #eee;padding:1rem;border-radius:.5rem;"
      >
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong>{{ t.title }}</strong>
            <div>{{ t.description }}</div>
            <small>Assigned: {{ t.assignedUser || '—' }}</small>
          </div>
          <div>
            <label>
              Status:
              <select [value]="t.status" (change)="onStatus(t.id!, $any($event.target).value)">
                <option *ngFor="let s of statuses" [value]="s">{{ labels[s] }}</option>
              </select>
            </label>
          </div>
        </div>
      </li>
    </ul>
    <ng-template #empty><p>No tasks yet.</p></ng-template>
  `,
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() changeStatus = new EventEmitter<{ id: string; status: TaskStatus }>();

  statuses = AllTaskStatuses;
  labels = TaskStatusLabels;

  trackById = (_: number, t: Task) => t.id;
  onStatus(id: string, status: TaskStatus) {
    this.changeStatus.emit({ id, status });
  }
}
