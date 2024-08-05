import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiDataService } from '../../utils/services/api-data.service';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../utils/services/snackbar.service';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-singlevendors',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SnackbarComponent,
    SnackbarComponent,
  ],
  templateUrl: './singlevendors.component.html',
  styleUrls: ['./singlevendors.component.css'],
})
export class SinglevendorsComponent implements OnInit {
  vendorForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiDataService,
    private snackbarService: SnackbarService // Inject SnackbarService
  ) {}

  ngOnInit(): void {
    this.initVendorForm();
    this.setConditionalValidators();
  }

  private initVendorForm(): void {
    this.vendorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      otherNames: [''],
      role: ['Administrator', Validators.required],
      countryCode: ['233', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10,20}$')],
      ],
      usePhoneNumber: [false],
      accountType: [''],
      bank: [''],
      bankBranch: [''],
      bankAccountNumber: ['', Validators.pattern('^\\d{10,20}$')],
      nameOnAccount: [''],
      addAnotherVendor: [false],
    });
  }

  private setConditionalValidators(): void {
    this.vendorForm
      .get('usePhoneNumber')
      ?.valueChanges.subscribe((usePhoneNumber) => {
        if (usePhoneNumber) {
          this.vendorForm
            .get('accountType')
            ?.setValidators([Validators.required]);
          this.vendorForm.get('bank')?.setValidators([Validators.required]);
          this.vendorForm
            .get('bankBranch')
            ?.setValidators([Validators.required]);
          this.vendorForm
            .get('bankAccountNumber')
            ?.setValidators([
              Validators.required,
              Validators.pattern('^\\d{10,20}$'),
            ]);
          this.vendorForm
            .get('nameOnAccount')
            ?.setValidators([Validators.required]);
        } else {
          this.vendorForm.get('accountType')?.clearValidators();
          this.vendorForm.get('bank')?.clearValidators();
          this.vendorForm.get('bankBranch')?.clearValidators();
          this.vendorForm.get('bankAccountNumber')?.clearValidators();
          this.vendorForm.get('nameOnAccount')?.clearValidators();
        }
        this.vendorForm.get('accountType')?.updateValueAndValidity();
        this.vendorForm.get('bank')?.updateValueAndValidity();
        this.vendorForm.get('bankBranch')?.updateValueAndValidity();
        this.vendorForm.get('bankAccountNumber')?.updateValueAndValidity();
        this.vendorForm.get('nameOnAccount')?.updateValueAndValidity();
      });
  }

  onSubmit(): void {
    if (this.vendorForm.valid) {
      this.isLoading = true;
      const formData = this.prepareFormData();

      this.apiService.createData('users', formData).subscribe({
        next: (response) => {
          this.handleSuccess('Vendor added successfully');
        },
        error: (error) => {
          console.error('Error submitting form:', error);
          this.handleError('Error occurred while adding vendor');
        },
        complete: () => {
          this.isLoading = false;
        },
      });
      return;
    }
    this.vendorForm.markAllAsTouched();
  }

  private prepareFormData(): any {
    return this.vendorForm.value;
  }

  private handleSuccess(message: string): void {
    this.snackbarService.showSnackbar(message, 'success');
    console.log(this.snackbarService.isOpen);
    this.resetForm();
  }

  private handleError(message: string): void {
    this.snackbarService.showSnackbar(message, 'error');
  }

  private resetForm(): void {
    if (!this.vendorForm.get('addAnotherVendor')?.value) {
      this.vendorForm.reset();
    }
  }

  isPhoneNumberUsed(): boolean {
    return this.vendorForm.get('usePhoneNumber')?.value;
  }

  get f() {
    return this.vendorForm.controls;
  }
}
