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
        { label: 'Sunday', value: 0 },
        { label: 'Monday', value: 1 },
        { label: 'Tuesday', value: 2 },
        { label: 'Wednesday', value: 3 },
        { label: 'Thursday', value: 4 },
        { label: 'Friday', value: 5 },
        { label: 'Saturday', value: 6 },
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
        <form onSubmit={handleSubmit}>
            {/* Name */}
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <div>{errors.name}</div>}
            </div>

            {/* Description */}
            <div>
                <textarea
                    placeholder="Description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                {errors.description && <div>{errors.description}</div>}
            </div>

            {/* Hourly Rate */}
            <div>
                <input
                    type="number"
                    placeholder="Hourly Rate"
                    value={data.hourlyRate}
                    onChange={(e) => setData('hourlyRate', e.target.value)}
                />
                {errors.hourlyRate && <div>{errors.hourlyRate}</div>}
            </div>

            {/* City */}
            <div>
                <input
                    type="text"
                    placeholder="City"
                    value={data.city}
                    onChange={(e) => setData('city', e.target.value)}
                />
                {errors.city && <div>{errors.city}</div>}
            </div>

            {/* Direction */}
            <div>
                <input
                    type="text"
                    placeholder="Direction"
                    value={data.direction}
                    onChange={(e) => setData('direction', e.target.value)}
                />
                {errors.direction && <div>{errors.direction}</div>}
            </div>

            {/* Musician Capacity */}
            <div>
                <input
                    type="number"
                    placeholder="Musician Capacity"
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
                    Has Equipment
                </label>
                {errors.hasEquipment && <div>{errors.hasEquipment}</div>}
            </div>
            <div>
                <p>Disponibilidad</p>
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

            <button type="submit" disabled={processing}>
                Create
            </button>
        </form>
    );
}
