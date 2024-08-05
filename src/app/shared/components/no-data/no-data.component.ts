import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalService } from '../../../utils/services/modal.service';

@Component({
  selector: 'app-no-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.css'], // Corrected the property name
})
export class NoDataComponent {
  @Input() text!: string;
  @Input() subText!: string;
  @Input() buttonText!: string;
  @Input() iconUrl!: string;

  constructor(private modalService: ModalService) {
    this.modalService.close();
  }

  openModal() {
    this.modalService.open();
  }
}
