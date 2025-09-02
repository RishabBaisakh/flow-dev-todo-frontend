import { Component } from '@angular/core';
import { TasksPage } from './features/tasks/tasks.page';
import { HeaderComponent } from './core/layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TasksPage, HeaderComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {}
