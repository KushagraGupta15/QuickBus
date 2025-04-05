import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PassengerInfo } from 'src/app/models/passenger-info';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['./passenger-info.component.css']
})
export class PassengerInfoComponent {
  passengerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private busService: BusService) {

  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.passengerForm = this.fb.group({
      passengers: this.fb.array([this.createPassenger()]), // Initialize with one passenger
      contact: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]) // Separate Contact Field
    });
  }


  get passengers(): FormArray {
    return this.passengerForm.get('passengers') as FormArray;
  }

  get contact(): FormControl {
    return this.passengerForm.get('contact') as FormControl
  }

  createPassenger(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]], // Age Validation
      gender: ['', Validators.required]
    });
  }

  addPassenger() {
    this.passengers.push(this.createPassenger());
  }

  removePassenger(index: number) {
    if (this.passengers.length > 1) {
      this.passengers.removeAt(index);
    }
  }

  continueBooking() {
    if (this.passengerForm.valid) {
      const passengerDetaisl = this.passengers.value;
      for (const passenger of passengerDetaisl) {
        const passengerObj: PassengerInfo = {
          passengerDetails: [],
          contact: 0

        }
        passengerObj.passengerDetails?.push(passenger);
        passengerObj.contact = this.contact.value;
        this.busService.setPassengerInfo(passengerObj);
        this.router.navigate(['/review_bus_ticket']);
      }
    }
  }
}
