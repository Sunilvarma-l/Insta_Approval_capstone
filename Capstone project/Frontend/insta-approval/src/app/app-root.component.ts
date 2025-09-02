import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // for formGroup, FormBuilder, FormControl etc.
import { FormsModule } from '@angular/forms'; // for ngModel
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule],
  template: `<router-outlet></router-outlet>`
})
export class AppRootComponent {}
