import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusDetails } from 'src/app/models/bus-details';
import { SeatDetails } from 'src/app/models/seat-details';
import { SelectedSeats } from 'src/app/models/selected-seats';
import { AuthService } from 'src/app/services/auth.service';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
})
export class SeatSelectionComponent {
  // busSeats = [
  //   [
  //     {
  //       seatNumber: 1,
  //       booked: false,
  //       selected: false,
  //       price: 15,
  //     },
  //     {
  //       seatNumber: 2,
  //       booked: true,
  //       selected: false,
  //       price: 15,
  //     },
  //     {
  //       seatNumber: '',
  //       aisle: true,
  //     },
  //     {
  //       seatNumber: 3,
  //       booked: false,
  //       selected: false,
  //       price: 15,
  //     },
  //     {
  //       seatNumber: 4,
  //       booked: false,
  //       selected: false,
  //       price: 15,
  //     },
  //   ],
  //   [
  //     {
  //       seatNumber: 5,
  //       booked: false,
  //       selected: false,
  //       price: 15,
  //     },
  //     {
  //       seatNumber: 6,
  //       booked: true,
  //       selected: false,
  //       price: 15,
  //     },
  //     {
  //       seatNumber: '',
  //       aisle: true,
  //     },
  //     {
  //       seatNumber: 7,
  //       booked: false,
  //       selected: false,
  //       price: 15,
  //     },
  //     {
  //       seatNumber: 8,
  //       booked: false,
  //       selected: false,
  //       price: 15,
  //     },
  //   ],
  //   [
  //     { seatNumber: 9, booked: false, selected: false, price: 15 },
  //     { seatNumber: 10, booked: false, selected: false, price: 15 },
  //     { seatNumber: '', aisle: true },
  //     { seatNumber: 11, booked: false, selected: false, price: 15 },
  //     { seatNumber: 12, booked: true, selected: false, price: 15 },
  //   ],
  //   [
  //     { seatNumber: 13, booked: false, selected: false, price: 15 },
  //     { seatNumber: 14, booked: true, selected: false, price: 15 },
  //     { seatNumber: '', aisle: true },
  //     { seatNumber: 15, booked: false, selected: false, price: 15 },
  //     { seatNumber: 16, booked: false, selected: false, price: 15 },
  //   ],
  //   [
  //     { seatNumber: 17, booked: false, selected: false, price: 15 },
  //     { seatNumber: 18, booked: false, selected: false, price: 15 },
  //     { seatNumber: '', aisle: true },
  //     { seatNumber: 19, booked: true, selected: false, price: 15 },
  //     { seatNumber: 20, booked: false, selected: false, price: 15 },
  //   ],
  // ];

  // selectedSeat: SelectedSeats = {
  //   seatDetails: [],
  //   fare: 0,
  // };
  // selectedSeats: SeatDetails[] = [];
  // totalPrice: number = 0;

  // constructor(private router: Router, private busService: BusService) {}

  // selectSeat(seat: any) {
  //   if (seat.booked || seat.aisle) return;

  //   seat.selected = !seat.selected;

  //   if (seat.selected) {
  //     this.selectedSeats.push(seat);
  //   } else {
  //     this.selectedSeats = this.selectedSeats.filter(
  //       (s) => s.seatNumber !== seat.seatNumber
  //     );
  //   }

  //   this.totalPrice = this.selectedSeats.reduce(
  //     (sum, s) => sum + (s.price ?? 0),
  //     0
  //   );
  // }

  // proceedToPassengerDetails() {
  //   this.selectedSeat.seatDetails?.push(...this.selectedSeats);
  //   this.selectedSeat.fare = this.totalPrice;
  //   this.busService.setSelectedSeats(this.selectedSeat);
  //   this.router.navigate(['/passenger_info']);
  // }
  busSeats: any[][] = [];
  selectedSeats: any[] = [];
  totalPrice: number = 0;
  bus: any;
  currentUser: any;
  private apiUrl = 'http://localhost:3000';

  constructor(private router: Router, private busService: BusService, private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      alert('Please log in first.');
      this.router.navigate(['/login']);
      return;
    }
  
    this.bus = this.busService.getBusDetails();
    if (!this.bus) {
      alert('No bus selected!');
      this.router.navigate(['/bus_list']);
      return;
  }
  this.fetchBusSeats();
  let storedBooking = localStorage.getItem('bookingDetails');
  if (storedBooking) {
    let booking = JSON.parse(storedBooking);
    if (booking.busId === this.bus.id) {
      this.selectedSeats = booking.seats;
      this.totalPrice = booking.totalFare;
    }
  }
}

  fetchBusSeats() {
    this.busSeats = this.formatSeats(this.bus.seats);
  }

  formatSeats(seats: any[]): any[][] {
    let formattedSeats: any[][] = [];
    let rowSize = 5;
    for (let i = 0; i < seats.length; i += rowSize) {
      let row = seats.slice(i, i + rowSize);
      row.splice(2, 0, { seatNumber: '', aisle: true });
      formattedSeats.push(row);
    }
    return formattedSeats;
  }

  selectSeat(seat: any) {
    if (seat.booked || seat.aisle) return;

    seat.selected = !seat.selected;

    if (seat.selected) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats = this.selectedSeats.filter(s => s.seatNumber !== seat.seatNumber);
    }

    this.totalPrice = this.selectedSeats.reduce((sum, s) => sum + (s.price ?? 0), 0);
  }

  proceedToPassengerDetails() {
    if (this.selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }
  
    // Mark seats as booked in local state
    this.selectedSeats.forEach(seat => (seat.booked = true));
  
    // Store booking details locally
    let bookingDetails = {
      userId: this.currentUser.id,
      busId: this.bus.id,
      busName: this.bus.busName,
      seats: this.selectedSeats,
      totalFare: this.totalPrice,
    };
  
    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
  
    // Update user bookings in local storage
    this.currentUser.bookedBuses.push(bookingDetails);
    localStorage.setItem('loggedInUser', JSON.stringify(this.currentUser));
  
    // Update server (JSON database)
    this.http.patch(`${this.apiUrl}/users/${this.currentUser.id}`, { bookedBuses: this.currentUser.bookedBuses }).subscribe(() => {
      this.http.patch(`${this.apiUrl}/buses/${this.bus.id}`, { seats: this.bus.seats }).subscribe(() => {
        this.router.navigate(['/passenger_info']);
      });
    });
  }
}
