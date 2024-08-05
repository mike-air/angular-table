import { Component } from '@angular/core';
import { BulkvendorsComponent } from './bulkvendors/bulkvendors.component';
import { SinglevendorsComponent } from './singlevendors/singlevendors.component';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [BulkvendorsComponent, SinglevendorsComponent],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css',
})
export class VendorComponent {}
