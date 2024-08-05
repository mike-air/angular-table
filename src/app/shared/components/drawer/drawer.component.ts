import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerStateService } from '../../../utils/services/drawer-state.service';
import { ApiDataService } from '../../../utils/services/api-data.service';
import { Transaction } from '../../../utils/Types';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent implements OnInit, OnChanges {
  @Input() transactionId: string | null = null;
  showDrawer: boolean = false;
  transactionDetails: Transaction | null = null;

  constructor(
    private drawerStateService: DrawerStateService,
    private apiDataService: ApiDataService
  ) {}

  ngOnInit(): void {
    this.drawerStateService.open(); // Open the drawer when component initializes
    if (this.transactionId) {
      this.fetchTransactionDetails(this.transactionId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactionId'] && this.transactionId) {
      this.fetchTransactionDetails(this.transactionId);
    }
  }

  fetchTransactionDetails(transactionId: string): void {
    this.apiDataService
      .getSingleData('transaction', transactionId)
      .subscribe((transaction) => {
        this.transactionDetails = transaction;
        this.showDrawer = true; // Show the drawer after data is fetched
      });
  }

  closeDrawer(): void {
    this.drawerStateService.close();
    this.showDrawer = false;
  }
}
