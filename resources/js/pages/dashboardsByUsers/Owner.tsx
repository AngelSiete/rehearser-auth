import { Link, router } from '@inertiajs/react';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
type OwnerDashboardProps = {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
};

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ auth }) => {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">Panel de Usuario - Propietario</h1>
            <p className="mb-4">
                Sé bienvenido, {auth.user.name}! propietario.
            </p>
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

export default OwnerDashboard;
