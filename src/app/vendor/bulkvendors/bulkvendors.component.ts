import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SinglevendorsComponent } from '../singlevendors/singlevendors.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SnackbarService } from '../../utils/services/snackbar.service';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-bulkvendors',
  standalone: true,
  imports: [
    SinglevendorsComponent,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    SnackbarComponent,
  ],
  templateUrl: './bulkvendors.component.html',
  styleUrls: ['./bulkvendors.component.css'],
})
export class BulkvendorsComponent {
  isBulkUpload: boolean = true;
  selectedFiles: FileList | null = null;

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {}

  showBulkUpload() {
    this.isBulkUpload = true;
  }

  showSingleUpload() {
    this.isBulkUpload = false;
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  downloadWorksheet() {
    const downloadUrl = 'path/to/your/worksheet.xlsx'; // Replace with your actual download URL
    window.open(downloadUrl, '_blank');
  }

  uploadWorksheet() {
    if (this.selectedFiles) {
      const formData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      this.http.post('your-upload-endpoint-url', formData).subscribe(
        (response) => {
          this.snackbarService.showSnackbar('Upload successful', 'success');
          console.log('Upload successful', response);
        },
        (error) => {
          this.snackbarService.showSnackbar('Upload failed', 'error');
          console.error('Upload failed', error);
        }
      );
    } else {
      this.snackbarService.showSnackbar('No files selected', 'error');
      console.log('No files selected');
    }
  }

  triggerFileInputClick() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
}
