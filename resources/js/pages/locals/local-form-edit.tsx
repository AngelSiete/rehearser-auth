import { useForm } from '@inertiajs/react';

type LocalType = {
    id: number;
    name: string;
    description: string;
    hourlyRate: number;
    city?: string;
    direction?: string;
    musicianCapacity?: number;
    hasEquipment?: boolean;
};

export default function Edit({ local }: { local: LocalType }) {
    const { data, setData, put, processing, errors } = useForm({
        name: local.name || '',
        description: local.description || '',
        hourlyRate: local.hourlyRate || 0,
        city: local.city || '',
        direction: local.direction || '',
        musicianCapacity: local.musicianCapacity || 0,
        hasEquipment: local.hasEquipment || false,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/locals/${local.id}`);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="m-auto w-min rounded-2xl border border-gray-100 bg-blue-50 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
        >
            {/* Name */}
            <div>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <div>{errors.name}</div>}
            </div>

            {/* Description */}
            <div>
                <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                {errors.description && <div>{errors.description}</div>}
            </div>

            {/* Hourly Rate */}
            <div>
                <input
                    type="number"
                    value={data.hourlyRate}
                    onChange={(e) =>
                        setData('hourlyRate', Number(e.target.value))
                    }
                />
                {errors.hourlyRate && <div>{errors.hourlyRate}</div>}
            </div>

            {/* City */}
            <div>
                <input
                    type="text"
                    value={data.city}
                    onChange={(e) => setData('city', e.target.value)}
                />
                {errors.city && <div>{errors.city}</div>}
            </div>

            {/* Direction */}
            <div>
                <input
                    type="text"
                    value={data.direction}
                    onChange={(e) => setData('direction', e.target.value)}
                />
                {errors.direction && <div>{errors.direction}</div>}
            </div>

            {/* Musician Capacity */}
            <div>
                <input
                    type="number"
                    value={data.musicianCapacity}
                    onChange={(e) =>
                        setData('musicianCapacity', Number(e.target.value))
                    }
                />
                {errors.musicianCapacity && (
                    <div>{errors.musicianCapacity}</div>
                )}
            </div>

            {/* Has Equipment */}
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={data.hasEquipment}
                        onChange={(e) =>
                            setData('hasEquipment', e.target.checked)
                        }
                    />
                    Has Equipment
                </label>
                {errors.hasEquipment && <div>{errors.hasEquipment}</div>}
            </div>

            <button type="submit" disabled={processing} className="dark:text-white">
                Actualizar
            </button>
        </form>
    );
}
