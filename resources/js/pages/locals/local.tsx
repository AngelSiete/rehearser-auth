import { Link, usePage } from '@inertiajs/react';

type LocalType = {
    id: number;
    user_id: number;
    name: string;
    description?: string;
    hourlyRate?: number;
    city: string;
    direction: string;
    musicianCapacity: number;
    hasEquipment:boolean;
};
export default function Local({ local } : {local: LocalType}) {
    const { auth } = usePage().props;
    const isOwner = auth.user.id === local.user_id;

    return (
        <div className="local mx-auto w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
            {/* Title */}
            <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
                {local.name}
            </h2>

            {/* Description */}
            <p className="descript mb-4 text-sm text-gray-600 dark:text-gray-300">
                {local.description}
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col">
                    <span className="text-gray-400">Hourly Rate</span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                        {local.hourlyRate} €/h
                    </span>
                </div>

                <div className="flex flex-col">
                    <span className="text-gray-400">City</span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                        {local.city || '—'}
                    </span>
                </div>

                <div className="direction flex flex-col">
                    <span className="text-gray-400">Direction</span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                        {local.direction || '—'}
                    </span>
                </div>

                <div className="flex flex-col">
                    <span className="text-gray-400">Capacity</span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                        {local.musicianCapacity ?? '—'}
                    </span>
                </div>
            </div>

            {/* Equipment badge */}
            <div className="mt-5">
                <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        local.hasEquipment
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                    }`}
                >
                    {local.hasEquipment ? 'Has Equipment' : 'No Equipment'}
                </span>
            </div>
            {isOwner && <Link href={`/locals/${local.id}/edit`} className="btn-edit">Edit</Link>}
        </div>
    );
};
