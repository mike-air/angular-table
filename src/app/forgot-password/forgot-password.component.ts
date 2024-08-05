import { SnackbarService } from './../utils/services/snackbar.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../utils/services/auth.service';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    SnackbarComponent,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    SnackbarComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private snackbarService: SnackbarService // Inject SnackbarService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      this.authService
        .forgotPassword(this.forgotPasswordForm.value.email)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            if (response.success) {
              this.snackbarService.showSnackbar(
                'Password reset link sent to your email address',
                'success'
              ); // Use SnackbarService
            } else {
              this.snackbarService.showSnackbar(response.message, 'error'); // Use SnackbarService
            }
          },
          error: (err) => {
            this.isLoading = false;
            this.snackbarService.showSnackbar(
              err.message || 'An error occurred',
              'error'
            ); // Use SnackbarService
          },
        });
    }
  }
}
