import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import type { LocalType } from '@/types/local';

type Props = {
    local: LocalType;
};

export default function BookingForm({ local }: Props) {
    const [date, setDate] = useState('');
    const { auth } = usePage().props;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!auth?.user) {
            alert('You must be logged in to book.');
            return;
        }

        router.post(`/locals/${local.id}/book`, { date });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col">
                Select date:
                <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]} // today or later
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 rounded border px-3 py-2"
                />
            </label>

            <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
                Book this space
            </button>
        </form>
    );
}
