import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GithubReposDialog } from '../../../features/github/github-repos-dialog/github-repos-dialog.component';
import { AdminStore } from '../../state/admin.store';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { TeamDialogComponent } from '../../../features/team-members/team-members-dialog/team-members-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);
  adminStore = inject(AdminStore);

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github-mark.svg')
    );
  }

  getGreeting(): string {
    const userName = this.adminStore.adminUser?.name || 'User';
    const hour = new Date().getHours();

    if (hour < 12) return `Good morning, ${userName}! 🌅`;
    if (hour < 18) return `Good afternoon, ${userName}! ☀️`;
    return `Good evening, ${userName}! 🌙`;
  }

  openGithubDialog(): void {
    this.dialog.open(GithubReposDialog);
  }

  openTeamDialog() {
    this.dialog.open(TeamDialogComponent);
  }
}
