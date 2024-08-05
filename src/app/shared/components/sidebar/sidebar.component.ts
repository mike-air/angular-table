import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../utils/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isDropdownOpen = false;
  dropdownItems = ['Profile', 'Settings', 'Logout'];

  constructor(private authService: AuthService) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onDropdownItemClick(item: string) {
    this.isDropdownOpen = false;
  }
}
