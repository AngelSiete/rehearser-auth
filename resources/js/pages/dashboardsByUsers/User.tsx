import { Link, router } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
type UserDashboardProps = {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
};

const UserDashboard: React.FC<UserDashboardProps> = ({ auth }) => {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">User Dashboard</h1>
            <p className="mb-4">
                Welcome, {auth.user.name}! You are logged in as an owner.
            </p>
            <div className="space-y-2"></div>
            <Link
                className="block w-full cursor-pointer"
                href={logout()}
                as="button"
                onClick={handleLogout}
                data-test="logout-button"
            >
                <LogOut className="mr-2" />
                Log out
            </Link>
        </div>
    );
};

export default UserDashboard;
