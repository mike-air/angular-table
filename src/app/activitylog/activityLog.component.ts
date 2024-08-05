import { Component, OnInit } from '@angular/core';
import { ActivityDataService } from '../utils/services/activity-data.service';
import { activityLogEntry, PaginationConfig } from '../utils/Types';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from '../shared/components/no-data/no-data.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [CommonModule, NoDataComponent, PaginationComponent],
  templateUrl: './activityLog.component.html',
  styleUrls: ['./activityLog.component.css'],
})
export class ActivityLogComponent implements OnInit {
  activityData: activityLogEntry[] = [];
  paginationConfig: PaginationConfig = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  };

  constructor(private activityDataService: ActivityDataService) {}

  ngOnInit(): void {
    this.loadActivityData();
  }

  loadActivityData(): void {
    const { items, totalItems } =
      this.activityDataService.paginateactivityLogEntries(
        this.paginationConfig.currentPage,
        this.paginationConfig.itemsPerPage
      );
    this.activityData = items;
    this.paginationConfig.totalItems = totalItems;
  }

  getActivityLogEntries(): activityLogEntry[] {
    return this.activityData;
  }

  onPageChange(page: number): void {
    this.paginationConfig.currentPage = page;
    this.loadActivityData();
  }
}
