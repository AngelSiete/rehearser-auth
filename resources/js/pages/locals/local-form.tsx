import { useForm } from '@inertiajs/react';
import type { Weekday, FormData } from '@/types/local';
export default function Create() {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        name: '',
        description: '',
        hourlyRate: '',
        city: '',
        direction: '',
        musicianCapacity: '',
        hasEquipment: false,
        available_weekdays: [],
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
        post('/locals');
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
                    placeholder="Nombre del local"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <div>{errors.name}</div>}
            </div>

            {/* Description */}
            <div>
                <textarea
                    placeholder="Descripción"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                {errors.description && <div>{errors.description}</div>}
            </div>

            {/* Hourly Rate */}
            <div>
                <input
                    type="number"
                    placeholder="Precio - Euros / hora"
                    value={data.hourlyRate}
                    onChange={(e) => setData('hourlyRate', e.target.value)}
                />
                {errors.hourlyRate && <div>{errors.hourlyRate}</div>}
            </div>

            {/* City */}
            <div>
                <input
                    type="text"
                    placeholder="Ciudad"
                    value={data.city}
                    onChange={(e) => setData('city', e.target.value)}
                />
                {errors.city && <div>{errors.city}</div>}
            </div>

            {/* Direction */}
            <div>
                <input
                    type="text"
                    placeholder="Dirección completa"
                    value={data.direction}
                    onChange={(e) => setData('direction', e.target.value)}
                />
                {errors.direction && <div>{errors.direction}</div>}
            </div>

            {/* Musician Capacity */}
            <div>
                <input
                    type="number"
                    placeholder="Núm. Músicos"
                    value={data.musicianCapacity}
                    onChange={(e) =>
                        setData('musicianCapacity', e.target.value)
                    }
                />
                {errors.musicianCapacity && (
                    <div>{errors.musicianCapacity}</div>
                )}
            </div>
            {/* Has Equipment (checkbox) */}
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

            <button type="submit" disabled={processing} className="dark:text-white">
                Crear
            </button>
        </form>
    );
}
