import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  signup() {
    if (!this.name || !this.email || !this.password) {
      alert('All fields are required');
      return;
    }

    // Check if the email already exists
    this.http.get<any[]>(this.apiUrl).subscribe(users => {
      if (users.some(user => user.email === this.email)) {
        alert('Email already registered. Please use another email.');
        return;
      }

      // Create new user object
      const newUser = { name: this.name, email: this.email, password: this.password, bookedBuses: [] };

      // Save user to JSON server
      this.http.post(this.apiUrl, newUser).subscribe(() => {
        alert('Signup successful! Please login.');
        this.router.navigate(['/login']);
      });
    });
  }
}
