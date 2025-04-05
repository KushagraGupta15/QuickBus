import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBusComponent } from './components/search-bus/search-bus.component';
import { BusListComponent } from './components/bus-list/bus-list.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { PassengerInfoComponent } from './components/passenger-info/passenger-info.component';
import { ReviewBusTicketComponent } from './components/review-bus-ticket/review-bus-ticket.component';
import { ViewBusTicketComponent } from './components/view-bus-ticket/view-bus-ticket.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: SearchBusComponent },
  { path: 'bus_list', component: BusListComponent },
  { path: 'seat_selection', component: SeatSelectionComponent },
  {
    path: 'passenger_info',
    component: PassengerInfoComponent,
  },
  { path: 'review_bus_ticket', component: ReviewBusTicketComponent },
  { path: 'view_bus_ticket', component: ViewBusTicketComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '/search' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
