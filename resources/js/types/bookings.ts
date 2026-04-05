import type { LocalType } from './local';

export type BookingType = {
    id: number; // Booking ID
    booking_date: string; // Date of the booking (YYYY-MM-DD)
    local: LocalType; // The local that was booked
};
