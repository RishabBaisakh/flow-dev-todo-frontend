import { Component, OnInit } from '@angular/core';
import { TasksStore } from '../../core/state/tasks.store';
import { TaskListComponent } from './ui/task-list/task-list.component';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TaskFormDialogComponent } from './ui/task-form-dialog/task-form-dialog.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskListComponent,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './tasks.page.html',
  styleUrl: 'tasks.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPage implements OnInit {
  readonly dialog = inject(MatDialog);

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

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskFormDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.onCreate(result);
    });
  }
}
