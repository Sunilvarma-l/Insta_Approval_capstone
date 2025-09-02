import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent {
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
