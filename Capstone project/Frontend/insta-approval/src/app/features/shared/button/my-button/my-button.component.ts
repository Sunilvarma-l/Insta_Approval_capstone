import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.css']
})
export class MyButtonComponent {
  @Input() label = 'Click Me';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
}
