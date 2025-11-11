export type Booking = {
  id: string;
  clientName: string;
  bookingDate: string; // Should be ISO string
  service: string;
  totalCost: number;
  status: 'Paid' | 'Unpaid' | 'Cancelled';
};
