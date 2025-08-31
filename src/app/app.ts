import { Component } from '@angular/core';
import { TasksPage } from './features/tasks/tasks.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TasksPage],
  template: `<app-tasks></app-tasks>`,
})
export class App {}
