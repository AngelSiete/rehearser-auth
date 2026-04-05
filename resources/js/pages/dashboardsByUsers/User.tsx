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
    console.log(bookings)
    return (
        <div className="p-6">
            <pre>{JSON.stringify(bookings, null, 2)}</pre>
            <h1 className="mb-4 text-2xl font-bold">
                Panel de Usuario - Músico
            </h1>
            <p className="mb-4">Sé bienvenido, {auth.user.name}! músico.</p>
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
