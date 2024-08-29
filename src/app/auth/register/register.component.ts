import { Component } from '@angular/core'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string | null = null; 
  successMessage: string | null = null; 

  private usernamePattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;
  private passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  constructor(private router: Router) {}

  onSubmit() {
    this.errorMessage = null; 
    this.successMessage = null; 

    const usernameValid = this.usernamePattern.exec(this.username) !== null;
    const passwordValid = this.passwordPattern.exec(this.password) !== null;

    if (usernameValid && passwordValid) {
      // Display success message on the page
      this.successMessage = 'Registration Successful! Redirecting to home...';

      // Simulate delay for showing success message before redirecting
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000); // Redirect after 2 seconds
    } else {
      // Display error message on the page
      this.errorMessage = 'Please enter a valid username and password. Username must contain at least one uppercase letter, one number, and one special character.';
    }
  }

  socialIcons: string[] = ['fa fa-facebook', 'fa fa-twitter', 'fa fa-google'];
}
