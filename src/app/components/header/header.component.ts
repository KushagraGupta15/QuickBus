import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userEmail: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.isLoggedIn = true;
      this.userEmail = user.email;
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userEmail = '';
    this.router.navigate(['/login']);
  }
}
