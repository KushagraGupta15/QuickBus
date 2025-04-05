export class BusDetails {
  id?: number;
  busName?: string;
  type?: string;
  departure?: string;
  duration?: string;
  fare?: number;
  availableSeats?: number;
  seats: { seatNumber: number; booked: boolean; price: number }[] = [];
}
