import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Please enter both email and password.');
      return;
    }

    // Fetch users from JSON server
    this.http.get<any[]>(this.apiUrl).subscribe(users => {
      const user = users.find(u => u.email === this.email && u.password === this.password);

      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful!');
        this.router.navigate(['/search']);
      } else {
        alert('Invalid email or password.');
      }
    });
  }
}
