import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = JSON.parse(localStorage.getItem('users') || '[]');
  private currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  signup(name: string, email: string, password: string): boolean {
    if (this.users.some((user: any) => user.email === email)) return false;
    this.users.push({ id: Date.now(), name, email, password, bookedBuses: [] });
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getUser() {
    return this.currentUser;
  }
  getCurrentUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }

  setCurrentUser(user: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }


  bookSeat(busId: number, seatNumber: number) {
    if (!this.currentUser) return;
    this.currentUser.bookedBuses.push({ busId, seatNumber });
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }
}
