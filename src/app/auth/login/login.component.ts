import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  socialIcons: string[] = ['fa fa-facebook', 'fa fa-twitter', 'fa fa-google'];

  constructor(private router: Router) {}

  onSubmit() {
    // Handle login logic here
    // On successful login
    alert('Login successfully');
    this.router.navigate(['/home'], { state: { username: this.username } });
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}

