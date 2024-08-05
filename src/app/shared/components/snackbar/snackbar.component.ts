import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SnackbarService } from '../../../utils/services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
})
export class SnackbarComponent {
  constructor(public snackbarService: SnackbarService) {}

  get snackbarClass() {
    return {
      'bg-green-500': this.snackbarService.type === 'success',
      'bg-red-500': this.snackbarService.type === 'error',
    };
  }
}
