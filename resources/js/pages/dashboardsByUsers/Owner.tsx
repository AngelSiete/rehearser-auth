
type OwnerDashboardProps = {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
};

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ auth }) => {
    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">Owner Dashboard</h1>
            <p className="mb-4">
                Welcome, {auth.user.name}! You are logged in as an owner.
            </p>

            <div className="space-y-2">
            </div>
        </div>
    );
};

export default OwnerDashboard;
