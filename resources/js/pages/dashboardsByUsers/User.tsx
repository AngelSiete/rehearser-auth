import { Link, router, usePage } from '@inertiajs/react';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import BookingList from '@/pages/locals/bookings-list';
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
    const { flash } = usePage().props as any;
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
            {flash?.success && (
                <div className="rounded-lg border border-green-300 bg-green-100 px-4 py-2 text-sm text-green-800 shadow-md">
                    {flash.success}
                </div>
            )}
            <p className="mb-4">Sé bienvenido, {auth.user.name}! músico.</p>
            <h2>Mis reservas:</h2>

            <div className="space-y-2">
                <BookingList bookings={bookings} />
            </div>
            <Link
                className="mt-4 block w-full cursor-pointer"
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
