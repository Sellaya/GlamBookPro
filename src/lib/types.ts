/**
 * @fileoverview This file contains the TypeScript types for the application.
 */

// A booking in the system.
export type Booking = {
  id: string; // The unique ID of the booking.
  user: string; // The ID of the user who made the booking.
  service: string; // The service that was booked.
  date: string; // The date and time of the booking.
  status: 'confirmed' | 'cancelled' | 'completed'; // The status of the booking.
  price: number; // The price of the booking.
};

// A user profile in the system.
export type UserProfile = {
  id: string; // The unique ID of the user.
  name: string; // The name of the user.
  email: string; // The email address of the user.
  role: 'user' | 'admin'; // The role of the user.
};
