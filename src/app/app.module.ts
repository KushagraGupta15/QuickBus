import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusListComponent } from './components/bus-list/bus-list.component';
import { PassengerInfoComponent } from './components/passenger-info/passenger-info.component';
import { ReviewBusTicketComponent } from './components/review-bus-ticket/review-bus-ticket.component';
import { SearchBusComponent } from './components/search-bus/search-bus.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { ViewBusTicketComponent } from './components/view-bus-ticket/view-bus-ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    BusListComponent,
    PassengerInfoComponent,
    ReviewBusTicketComponent,
    SearchBusComponent,
    SeatSelectionComponent,
    ViewBusTicketComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
