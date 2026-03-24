import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        hourlyRate: '',
        city: '',
        direction: '',
        musicianCapacity: '',
        hasEquipment: false,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/locals');
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

            <button type="submit" disabled={processing}>
                Create
            </button>
        </form>
    );
}
