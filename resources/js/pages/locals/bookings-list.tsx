import { Link, router } from '@inertiajs/react';
import type { BookingType } from '@/types/bookings';

type BookingProps = {
    bookings: BookingType[];
};
const BookingList: React.FC<BookingProps> = ({bookings}) =>{
    const cancelBooking = (id: number): void => {
        if (confirm('¿Cancelar esta reserva?')) {
            router.delete(`/bookings/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    console.log('Reserva cancelada');
                },
            });
        }
    };

    return (
        <ul className="space-y-2">
            {bookings.map((booking) => (
                <li key={booking.id}>
                    <details className="group rounded-md border border-gray-200 bg-white shadow-sm">
                        <summary className="flex cursor-pointer list-none items-center justify-between p-4 transition hover:bg-gray-50">
                            <span className="text-gray-800 group-hover:text-red-800">
                                <strong>{booking.local.name}</strong> —{' '}
                                {booking.booking_date}
                            </span>
                            <span className="text-sm text-gray-400">
                                Más info
                            </span>
                        </summary>

                        <div className="space-y-1 px-4 pb-4 text-sm text-gray-600">
                            <p>Ciudad: {booking.local.city}</p>
                            <p>Dirección: {booking.local.direction}</p>
                            {booking.local.hourlyRate && (
                                <p>Precio: €{booking.local.hourlyRate}/hr</p>
                            )}
                            {booking.local.musicianCapacity && (
                                <p>
                                    Capacidad: {booking.local.musicianCapacity}{' '}
                                    músicos
                                </p>
                            )}

                            <Link
                                href={`/local/${booking.local.id}`}
                                className="mt-2 inline-block text-red-800 hover:underline"
                            >
                                Ver ficha del local →
                            </Link>
                            <br/>
                            <button onClick={() => cancelBooking(booking.id)} className="dark:text-black">
                                Cancelar reserva
                            </button>
                        </div>
                    </details>
                </li>
            ))}
        </ul>
    );
}

export default BookingList;
