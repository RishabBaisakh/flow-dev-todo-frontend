import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-github-repos-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatButton],
  templateUrl: './github-repos-dialog.component.html',
  styleUrl: './github-repos-dialog.component.css',
})
export class GithubReposDialog {
  readonly dialogRef = inject(MatDialogRef<GithubReposDialog>);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
