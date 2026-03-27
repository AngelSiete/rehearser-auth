
import { Link } from '@inertiajs/react';
import type { LocalType } from '@/types/local';
import Local from './local';

export default function Index({ locals }: { locals: LocalType[] }) {
    const isLocalsEmpty : boolean = (locals && locals.length === 0);

    return (
        <div className="locals-index grid grid-cols-1 gap-6 md:grid-cols-3">
            {isLocalsEmpty && (
                <h2 className="text-center md:w-120 dark:text-white">
                    Parece que no hay locales que coincidan con tu búsqueda!
                </h2>
            )}
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
                            available_weekdays: local.available_weekdays,
                        }}
                    />
                </Link>
            ))}
        </div>
    );
}
