import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../../utils/services/modal.service';
import { ApiDataService } from '../../../utils/services/api-data.service';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../../utils/services/snackbar.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SnackbarComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  paymentForm: FormGroup;
  isLoading = false;

  schools = ['SmartsApp School', 'School 2', 'School 3'];
  students = ['Paa Kojo', 'Student 2', 'Student 3'];
  invoices = ['Invoice 1', 'Invoice 2', 'Invoice 3'];

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private apiService: ApiDataService,
    private snackbarService: SnackbarService // Inject SnackbarService
  ) {
    this.paymentForm = this.fb.group({
      transactionId: ['', Validators.required],
      amountPaid: ['', [Validators.required, Validators.min(0)]],
      school: ['', Validators.required],
      student: ['', Validators.required],
      invoice: ['', Validators.required],
    });
  }

  get isOpen(): boolean {
    return this.modalService.isOpen;
  }

  closeModal() {
    this.modalService.close();
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      this.isLoading = true;
      this.apiService
        .createData('transaction', this.paymentForm.value)
        .subscribe({
          next: (response) => {
            this.handleSuccess('Payment recorded successfully');
          },
          error: (error) => {
            this.handleError('Error occurred while recording payment');
          },
        });
    } else {
      this.handleError('Please fill out all required fields');
    }
  }

  private handleSuccess(message: string) {
    this.showSnackbarMessage(message, 'success');
    this.resetFormAndCloseModal();
  }

  private handleError(message: string) {
    this.showSnackbarMessage(message, 'error');
  }

  private showSnackbarMessage(message: string, type: 'success' | 'error') {
    this.snackbarService.showSnackbar(message, type); // Use SnackbarService
    this.isLoading = false;
  }

  private resetFormAndCloseModal() {
    this.paymentForm.reset();
    this.closeModal();
  }

  get f() {
    return this.paymentForm.controls;
  }
}
