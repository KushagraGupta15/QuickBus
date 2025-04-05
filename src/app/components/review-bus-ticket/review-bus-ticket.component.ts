import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusDetails } from 'src/app/models/bus-details';
import { PassengerInfo } from 'src/app/models/passenger-info';
import { RouteDetails } from 'src/app/models/route-details';
import { SelectedSeats } from 'src/app/models/selected-seats';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-review-bus-ticket',
  templateUrl: './review-bus-ticket.component.html',
  styleUrls: ['./review-bus-ticket.component.css'],
})
export class ReviewBusTicketComponent implements OnInit {
  routeDetails!: RouteDetails;
  busDetails!: BusDetails;
  selectedSeats!: SelectedSeats;
  passengerInfo!: PassengerInfo;
  seatNumbers: number[] = [];

  constructor(private router: Router, private busService: BusService) {}

  totalFare: number = 0; // Add this property at the top

  ngOnInit() {
    this.routeDetails = this.busService.getRouteDetails() || {
      source: '',
      destination: '',
      date: '',
    };
    this.busDetails = this.busService.getBusDetails() || {
      busName: '',
      type: '',
      departure: '',
      duration: '',
      fare: 0,
      seats: [],
    };
    this.selectedSeats = this.busService.getSelectedSeats() || {
      seatDetails: [],
    };
    this.passengerInfo = this.busService.getPassengerInfo() || {
      passengerDetails: [],
      contact: '',
    };

    console.log('Route Details:', this.routeDetails);
    console.log('Bus Details:', this.busDetails);
    console.log('Selected Seats:', this.selectedSeats);
    console.log('Passenger Info:', this.passengerInfo);

    if (!this.selectedSeats || !this.selectedSeats.seatDetails) {
      console.error('No seat details found!');
      return;
    }

    this.getSeatNumber();
    this.calculateTotalFare();

    setTimeout(() => {
      this.calculateTotalFare();
    }, 100);
  }

  calculateTotalFare() {
    this.totalFare = (this.selectedSeats.seatDetails ?? []).reduce(
      (total, seat) => {
        return total + (seat.price || this.busDetails.fare || 0);
      },
      0
    );
  }

  getSeatNumber() {
    this.seatNumbers =
      this.selectedSeats.seatDetails
        ?.map((seat) => seat.seatNumber)
        .filter(
          (seatNumber): seatNumber is number => seatNumber !== undefined
        ) || [];
    return this.seatNumbers;
  }

  confirmBooking() {
    this.router.navigate(['/view_bus_ticket']);
  }
}
