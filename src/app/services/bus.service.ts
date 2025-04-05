import { Injectable } from '@angular/core';
import { RouteDetails } from '../models/route-details';
import { BusDetails } from '../models/bus-details';
import { SelectedSeats } from '../models/selected-seats';
import { PassengerInfo } from '../models/passenger-info';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  constructor(private http: HttpClient) {}
  private selectedBus!: BusDetails;
  routeDetails!: RouteDetails;
  busDetails!: BusDetails;
  selectedSeats!: SelectedSeats;
  passengerInfo!: PassengerInfo;

  // store route details
  setRouteDetails(routeDetails: RouteDetails) {
    this.routeDetails = routeDetails;
  }

  // get route details
  getRouteDetails(): RouteDetails {
    return this.routeDetails;
  }

  getBuses(): Observable<BusDetails[]> {
    return this.http.get<BusDetails[]>('http://localhost:3000/buses');
  }
  setSelectedBus(bus: BusDetails) {
    this.selectedBus = bus;
  }

  // Get selected bus details
  getSelectedBus(): BusDetails | null {
    return this.selectedBus;
  }
  getBusById(busId: number): Observable<BusDetails> {
    return this.http.get<BusDetails>(`http://localhost:3000/buses/${busId}`);
  }

  setBusDetails(bus: BusDetails) {
    this.selectedBus = bus;
  }

  getBusDetails(): BusDetails | null {
    return this.selectedBus;
  }
  // set selected seats
  setSelectedSeats(seats: any) {
    localStorage.setItem('selectedSeats', JSON.stringify(seats));
  }
  // get selected seats
  getSelectedSeats() {
    const storedSeats = localStorage.getItem('selectedSeats');
    return storedSeats ? JSON.parse(storedSeats) : null;
  }

  // set passenger info
  setPassengerInfo(passengerInfo: PassengerInfo) {
    this.passengerInfo = passengerInfo;
  }

  // get passenger info
  getPassengerInfo(): PassengerInfo {
    return this.passengerInfo;
  }

  
}
