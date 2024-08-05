import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../utils/services/auth.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { SnackbarService } from '../utils/services/snackbar.service';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    SnackbarComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackbarService: SnackbarService // Inject SnackbarService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    try {
      const response = await firstValueFrom(
        this.authService.login(email, password)
      );
      if (response) {
        this.authService.isLoggedIn();
        this.snackbarService.showSnackbar('Login successful!', 'success'); // Use SnackbarService
        this.router.navigate(['/home']);
      } else {
        this.snackbarService.showSnackbar('Invalid credentials.', 'error'); // Use SnackbarService
      }
    } catch (error) {
      console.error(error);
      this.snackbarService.showSnackbar(
        'Login failed. Please check your internet or credentials and try again.',
        'error'
      ); // Use SnackbarService
    } finally {
      this.isLoading = false;
    }
  }
}
