import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit{
  signupForm: FormGroup;

  private apiUrl = 'http://localhost:3000/users';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signup() {
    if (!this.signupForm.valid) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const { name, email, password } = this.signupForm.value;
    // Check if the email already exists
    this.http.get<any[]>(this.apiUrl).subscribe((users) => {
      if (users.some((user) => user.email === email)) {
        alert('Email already registered. Please use another email.');
        return;
      }

      // Create new user object
      const newUser = {
        name: name,
        email: email,
        password: password,
        bookedBuses: [],
      };

      // Save user to JSON server
      this.http.post(this.apiUrl, newUser).subscribe(() => {
        alert('Signup successful! Please login.');
        this.router.navigate(['/login']);
      });
    });
  }
}
