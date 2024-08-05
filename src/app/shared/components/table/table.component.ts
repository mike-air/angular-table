import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../utils/services/modal.service';
import { DrawerStateService } from '../../../utils/services/drawer-state.service';
import { DrawerComponent } from '../drawer/drawer.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { Transaction, PaginationConfig } from '../../../utils/Types';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    DrawerComponent,
    PaginationComponent,
    SnackbarComponent,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() transactions: Transaction[] = [];
  showDropdownIndex: number = -1;
  paginatedTransactions: Transaction[] = [];
  selectedTransactions: Set<string> = new Set();
  selectAll: boolean = false;
  selectedTransactionId: string | null = null;

  paginationConfig: PaginationConfig = {
    totalItems: 0,
    itemsPerPage: 10,
    currentPage: 1,
  };

  constructor(
    private modalService: ModalService,
    private drawerStateService: DrawerStateService
  ) {
    this.modalService.close();
    this.drawerStateService.close();

    console.log(this.transactions);
  }

  ngOnInit(): void {
    this.paginationConfig.totalItems = this.transactions.length;
    this.updatePaginatedTransactions();
  }

  setData(transactions: Transaction[]): void {
    this.transactions = transactions;
    this.paginationConfig.totalItems = this.transactions.length;
    this.updatePaginatedTransactions();
  }

  openModal(): void {
    this.modalService.open();
  }

  toggleDropdown(index: number): void {
    this.showDropdownIndex = this.showDropdownIndex === index ? -1 : index;
  }

  viewDetails(transactionId: string): void {
    this.selectedTransactionId = transactionId;
    this.drawerStateService.open();
    this.showDropdownIndex = -1; // Close dropdown after action
  }

  editTransaction(transaction: Transaction): void {
    this.modalService.open();
    console.log('Edit transaction', transaction);
    this.showDropdownIndex = -1; // Close dropdown after action
  }

  deleteTransaction(transaction: Transaction): void {
    console.log('Delete transaction', transaction);
    this.showDropdownIndex = -1; // Close dropdown after action
  }

  onPageChange(page: number): void {
    this.paginationConfig.currentPage = page;
    this.updatePaginatedTransactions();
  }

  onItemsPerPageChange(itemsPerPage: number): void {
    this.paginationConfig.itemsPerPage = itemsPerPage;
    this.updatePaginatedTransactions();
  }

  updatePaginatedTransactions(): void {
    const startIndex =
      (this.paginationConfig.currentPage - 1) *
      this.paginationConfig.itemsPerPage;
    const endIndex = Math.min(
      startIndex + this.paginationConfig.itemsPerPage,
      this.transactions.length
    );
    this.paginatedTransactions = this.transactions.slice(startIndex, endIndex);
    this.updateSelectAllState();
  }

  toggleSelectAll(): void {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.paginatedTransactions.forEach((transaction) =>
        this.selectedTransactions.add(transaction.transactionId)
      );
    } else {
      this.paginatedTransactions.forEach((transaction) =>
        this.selectedTransactions.delete(transaction.transactionId)
      );
    }
  }

  toggleSelectTransaction(transactionId: string): void {
    if (this.selectedTransactions.has(transactionId)) {
      this.selectedTransactions.delete(transactionId);
    } else {
      this.selectedTransactions.add(transactionId);
    }
    this.updateSelectAllState();
  }

  updateSelectAllState(): void {
    this.selectAll =
      this.paginatedTransactions.length > 0 &&
      this.paginatedTransactions.every((transaction) =>
        this.selectedTransactions.has(transaction.transactionId)
      );
  }

  getInitials(name: string): string {
    const nameParts = name.split(' ');

    return nameParts.length === 1
      ? nameParts[0].slice(0, 2).toUpperCase()
      : (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  }
}
