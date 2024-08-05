import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ApiDataService } from '../utils/services/api-data.service';
import { Transaction } from '../utils/Types';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from '../shared/components/no-data/no-data.component';
import { TableComponent } from '../shared/components/table/table.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    CommonModule,
    NoDataComponent,
    TableComponent,
    NavbarComponent,
    PaginationComponent,
  ],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit, OnChanges {
  data: Transaction[] = [];
  isLoading = true;
  isError = false;
  errorMessage = '';
  searchParams: { [key: string]: string } = {};
  page = 1;
  itemsPerPage = 10;

  constructor(
    private apiDataService: ApiDataService,
    private activatedRoute: ActivatedRoute
  ) {
    // console.log(this.searchParams)
    // Get the query parameters from the URL
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchParams = { ...params };
      // console.log(this.searchParams);
      this.fetchFilteredData('transaction', this.searchParams);
    });
  }

  ngOnInit(): void {
    this.fetchFilteredData('transaction', this.searchParams);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchParams']) {
      this.fetchFilteredData('transaction', this.searchParams);
    }
  }

  fetchFilteredData(
    endpoint: string,
    queryParams: { [key: string]: string }
  ): void {
    this.isLoading = true;
    this.isError = false;
    this.apiDataService.getFilteredData(endpoint, queryParams).subscribe({
      next: (data) => {
        this.data = data;
        this.isLoading = false;
        this.isError = false;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.errorMessage = 'Error fetching data. Please try again later.';
        this.isLoading = false;
        this.isError = true;
      },
    });
  }

  fetchData(): void {
    this.isLoading = true;
    this.isError = false;
    this.apiDataService.getData('transaction').subscribe({
      next: (data) => {
        this.data = data;
        this.isLoading = false;
        this.isError = false;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.errorMessage = 'Error fetching data. Please try again later.';
        this.isLoading = false;
        this.isError = true;
      },
    });
  }

  onSearchResults(data: Transaction[]): void {
    this.data = data;
  }
}
