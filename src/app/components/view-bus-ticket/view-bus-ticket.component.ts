import { Component } from '@angular/core';
import { BusDetails } from 'src/app/models/bus-details';
import { PassengerInfo } from 'src/app/models/passenger-info';
import { RouteDetails } from 'src/app/models/route-details';
import { SelectedSeats } from 'src/app/models/selected-seats';
import { BusService } from 'src/app/services/bus.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-view-bus-ticket',
  templateUrl: './view-bus-ticket.component.html',
  styleUrls: ['./view-bus-ticket.component.css']
})
export class ViewBusTicketComponent {
  ticketId: string = '';
  ticketGenerated: boolean = false;
  routeDetails!: RouteDetails
  busDetails!: BusDetails;
  selectedSeats!: SelectedSeats;
  passengerInfo!: PassengerInfo
  seatNumbers: number[] = [];

  constructor(private busService: BusService) { }

  ngOnInit() {
    this.routeDetails = this.busService.getRouteDetails() || { source: '', destination: '', date: '' };
  
    const busDetails = this.busService.getBusDetails();
    if (!busDetails) {
      console.error("Bus details not found!");
      return;
    }
    this.busDetails = busDetails;
  
    this.selectedSeats = this.busService.getSelectedSeats() || { seatDetails: [] };
    this.passengerInfo = this.busService.getPassengerInfo() || { passengerDetails: [], contact: '' };
  
    console.log('Route Details:', this.routeDetails);
    console.log('Bus Details:', this.busDetails);
    console.log('Selected Seats:', this.selectedSeats);
    console.log('Passenger Info:', this.passengerInfo);
  
    if (!this.selectedSeats || !this.selectedSeats.seatDetails) {
      console.error("No seat details found!");
      return;
    }
  
    this.generateTicket();
    this.getSeatNumber();
  }

  generateTicket() {
    this.ticketId = this.generateTicketId();
    this.ticketGenerated = true;
  }

  generateTicketId(): string {
    return 'TCKT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  getSeatNumber() {
    this.seatNumbers = [];
    this.selectedSeats.seatDetails?.forEach(eachSeat => {
      if (eachSeat.seatNumber)
        this.seatNumbers?.push(eachSeat.seatNumber);
    })
    return this.seatNumbers;
  }

  printTicket() {
    window.print();
  }
}
