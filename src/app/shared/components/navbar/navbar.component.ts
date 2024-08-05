import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService } from '../../../utils/services/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiDataService } from '../../../utils/services/api-data.service';
import { Transaction } from '../../../utils/Types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ModalComponent, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() searchResults = new EventEmitter<Transaction[]>();

  regions: string[] = [
    'Greater Accra',
    'Ashanti',
    'Eastern',
    'Western',
    'Northern',
  ];
  schools: string[] = ['Smartsapp School', 'Smartsapp College'];
  statuses: string[] = ['Pending', 'Success', 'Failed'];

  selectedRegion = '';
  selectedSchool = '';
  selectedStatus = '';
  selectedDate = '';
  searchQuery = '';

  constructor(
    private modalService: ModalService,
    private apiDataService: ApiDataService,
    private router: Router
  ) {}

  openModal() {
    this.modalService.open();
  }

  search() {
    const params = this.buildQueryParams();
    const endpoint = 'transaction';
    this.router.navigate(['/transactions'], { queryParams: params });
    this.apiDataService.searchData(endpoint, params).subscribe({
      next: (data) => {
        this.searchResults.emit(data);
        console.log(data);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  clearFilters() {
    this.selectedRegion = '';
    this.selectedSchool = '';
    this.selectedStatus = '';
    this.selectedDate = '';
    this.searchQuery = '';
  }

  hasSelectedFilters(): boolean {
    return (
      this.selectedRegion !== '' ||
      this.selectedSchool !== '' ||
      this.selectedStatus !== '' ||
      this.selectedDate !== '' ||
      this.searchQuery !== ''
    );
  }

  removeFilter(filter: string) {
    switch (filter) {
      case 'region':
        this.selectedRegion = '';
        break;
      case 'school':
        this.selectedSchool = '';
        break;
      case 'status':
        this.selectedStatus = '';
        break;
      case 'date':
        this.selectedDate = '';
        break;
      case 'searchQuery':
        this.searchQuery = '';
        break;
    }
    this.search();
  }

  private buildQueryParams(): { [key: string]: string } {
    const params: { [key: string]: string } = {};

    if (this.selectedRegion) params['region'] = this.selectedRegion;
    if (this.selectedSchool) params['school'] = this.selectedSchool;
    if (this.selectedStatus) params['status'] = this.selectedStatus;
    if (this.selectedDate) params['date'] = this.selectedDate;
    if (this.searchQuery) params['student'] = this.searchQuery;

    return params;
  }
}
