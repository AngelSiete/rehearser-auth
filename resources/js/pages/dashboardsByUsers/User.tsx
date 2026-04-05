import { Link, router } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
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
            <ul className="my-8">
                {bookings.map((booking) => (
                    <li
                        key={booking.id}
                        className="rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md dark:bg-gray-500"
                    >
                        <Link
                            href={`/local/${booking.local.id}`}
                            className="block text-gray-800 hover:text-red-800"
                        >
                            Reserva en el local{' '}
                            <strong>{booking.local.name}</strong> para el día{' '}
                            {booking.booking_date} en {booking.local.city}
                        </Link>
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
