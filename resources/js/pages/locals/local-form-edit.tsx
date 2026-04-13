import { useForm } from '@inertiajs/react';
import type { Weekday, LocalType } from '@/types/local';

export default function Edit({ local }: { local: LocalType }) {
    const { data, setData, put, processing, errors } = useForm({
        name: local.name || '',
        description: local.description || '',
        hourlyRate: local.hourlyRate || 0,
        city: local.city || '',
        direction: local.direction || '',
        musicianCapacity: local.musicianCapacity || 0,
        hasEquipment: local.hasEquipment || false,
        available_weekdays: local.available_weekdays || [],
    });

    const weekdays: Weekday[] = [
        { label: 'Domingo', value: 0 },
        { label: 'Lunes', value: 1 },
        { label: 'Martes', value: 2 },
        { label: 'Miércoles', value: 3 },
        { label: 'Jueves', value: 4 },
        { label: 'Viernes', value: 5 },
        { label: 'Sábado', value: 6 },
    ];
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/locals/${local.id}`);
    }
    function toggleWeekday(day: number) {
        if (data.available_weekdays.includes(day)) {
            setData(
                'available_weekdays',
                data.available_weekdays.filter((d) => d !== day),
            );
        } else {
            setData('available_weekdays', [...data.available_weekdays, day]);
        }
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
                    Equipo propio
                </label>
                {errors.hasEquipment && <div>{errors.hasEquipment}</div>}
            </div>

            <div>
                <p>Disponibilidad:</p>
                {weekdays.map((day: Weekday) => (
                    <label key={day.value} style={{ display: 'block' }}>
                        <input
                            type="checkbox"
                            checked={data.available_weekdays.includes(
                                day.value,
                            )}
                            onChange={() => toggleWeekday(day.value)}
                        />
                        {day.label}
                    </label>
                ))}

                {errors.available_weekdays && (
                    <div>{errors.available_weekdays}</div>
                )}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="dark:text-white"
            >
                Actualizar
            </button>
        </form>
    );
}
