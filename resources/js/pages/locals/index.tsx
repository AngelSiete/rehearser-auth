
import { Link } from '@inertiajs/react';
import Local from './local';

type LocalType = {
    id: number;
    user_id: number;
    name: string;
    description: string;
    hourlyRate?: number;
    city: string;
    direction: string;
    musicianCapacity: number;
    hasEquipment: boolean;
};
export default function Index({ locals }: { locals: LocalType[] }) {

    return (
        <div className="locals-index grid grid-cols-1 gap-6 md:grid-cols-3">
            {locals.map((local: LocalType) => (
                <Link
                    key={local.id}
                    href={`/local/${local.id}`}
                    className="rounded-lg p-4 shadow"
                >
                    <Local
                        local={{
                            id: local.id,
                            user_id: local.user_id,
                            name: local.name,
                            description: local.description,
                            hourlyRate: local.hourlyRate,
                            city: local.city,
                            direction: local.direction,
                            musicianCapacity: local.musicianCapacity,
                            hasEquipment: local.hasEquipment,
                        }}
                    />
                </Link>
            ))}
        </div>
    );
}
