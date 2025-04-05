import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBusTicketComponent } from './view-bus-ticket.component';

describe('ViewBusTicketComponent', () => {
  let component: ViewBusTicketComponent;
  let fixture: ComponentFixture<ViewBusTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBusTicketComponent]
    });
    fixture = TestBed.createComponent(ViewBusTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
