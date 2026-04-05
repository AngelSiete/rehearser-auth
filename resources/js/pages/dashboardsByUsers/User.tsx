import { Link, router } from '@inertiajs/react';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import type { BookingType } from '@/types/bookings';
type UserDashboardProps = {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    bookings: BookingType[];
};

const UserDashboard: React.FC<UserDashboardProps> = ({ auth, bookings }) => {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">
                Panel de Usuario - Músico
            </h1>
            <p className="mb-4">Sé bienvenido, {auth.user.name}! músico.</p>
            <h2>Mis reservas:</h2>
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
                                        Capacidad:{' '}
                                        {booking.local.musicianCapacity}{' '}
                                        músicos
                                    </p>
                                )}

                                <Link
                                    href={`/local/${booking.local.id}`}
                                    className="mt-2 inline-block text-red-800 hover:underline"
                                >
                                    Ver ficha del local →
                                </Link>
                            </div>
                        </details>
                    </li>
                ))}
            </ul>
            <div className="space-y-2"></div>
            <Link
                className="block w-full cursor-pointer"
                href={logout()}
                as="button"
                onClick={handleLogout}
                data-test="logout-button"
            >
                Sal de tu cuenta
            </Link>
        </div>
    );
};

export default UserDashboard;
