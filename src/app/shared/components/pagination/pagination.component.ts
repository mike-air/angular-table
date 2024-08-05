import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { PaginationConfig } from '../../../utils/Types';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  config: PaginationConfig = {
    itemsPerPage: 10,
    totalItems: 0,
    currentPage: 1,
  };

  pages: (number | null)[] = [];
  startEntry: number = 0;
  endEntry: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['totalItems'] &&
      changes['totalItems'].currentValue !== changes['totalItems'].previousValue
    ) {
      this.config.totalItems = this.totalItems;
      this.calculatePagination();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.config.totalItems / this.config.itemsPerPage);
  }

  calculatePagination(): void {
    this.updateEntriesRange();

    const totalPages = this.totalPages;
    const currentPage = this.config.currentPage;
    const pages: (number | null)[] = []; // Use null for ellipses

    if (totalPages <= 7) {
      // Show all pages if there are 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show the first page
      pages.push(1);

      // Add ellipses if needed
      if (currentPage > 4) {
        pages.push(null); // null will represent "..."
      }

      // Show pages around the current page
      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipses if needed
      if (currentPage < totalPages - 3) {
        pages.push(null); // null will represent "..."
      }

      // Always show the last page
      pages.push(totalPages);
    }
    this.pages = pages;
  }

  updateEntriesRange(): void {
    this.startEntry =
      (this.config.currentPage - 1) * this.config.itemsPerPage + 1;
    this.endEntry = Math.min(
      this.config.currentPage * this.config.itemsPerPage,
      this.totalItems
    );
  }

  changeItemsPerPage(): void {
    this.config.currentPage = 1; // Reset to first page
    this.calculatePagination();
    this.itemsPerPageChange.emit(this.config.itemsPerPage);
  }

  onPageChange(page: number): void {
    if (!(page > 0 && page <= this.totalPages)) {
      return;
    }
    this.config.currentPage = page;
    this.calculatePagination();
    this.pageChange.emit(this.config.currentPage);
  }
}
