import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.css'
})
export class BookTableComponent {
  reservationForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      people: ['', [Validators.required, Validators.min(1), Validators.max(8)]],
      message: ['', [Validators.maxLength(100)]],
      tableType: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    //Add Function if needed
  }

  onSubmit() {
    this.isSubmitting = true;
    this.errorMessage = '';
    
    if (this.reservationForm.valid) {
      // Simulate a successful submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
      }, 1000);
    } else {
      this.isSubmitting = false;
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}
