import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusDetails } from 'src/app/models/bus-details';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css'],
})
export class BusListComponent {
  busList: BusDetails[] = [];

  constructor(private router: Router, private busService: BusService) {}

  ngOnInit(): void {
    this.fetchBuses();
  }

  // Fetch buses from JSON server
  fetchBuses() {
    this.busService.getBuses().subscribe((buses) => {
      this.busList = buses;
    });
  }

  onSelectBus(bus: BusDetails) {
    this.busService.setSelectedBus(bus); // Store selected bus details
    this.router.navigate(['/seat_selection']);
  }
}
