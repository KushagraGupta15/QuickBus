import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteDetails } from 'src/app/models/route-details';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.css'],
})
export class SearchBusComponent implements OnInit {
  routeDetails: RouteDetails = {
    source: '',
    destination: '',
    date: new Date(),
  };

  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private busService: BusService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  searchBuses() {
    console.log(this.searchForm);
    this.routeDetails.source = this.searchForm.get('source')?.value;
    this.routeDetails.destination = this.searchForm.get('destination')?.value;
    this.routeDetails.date = this.searchForm.get('date')?.value;
    this.busService.setRouteDetails(this.routeDetails);
    this.router.navigate(['/bus_list']);
  }
}
