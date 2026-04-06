import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import type { LocalType } from '@/types/local';

type BookingFormProps = {
    local: LocalType;
    bookedDates?: string[]; // already booked days in YYYY-MM-DD format
};

export default function BookingForm({
    local,
    bookedDates = [],
}: BookingFormProps) {
    const [date, setDate] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { auth } = usePage().props as any;

    const isDateDisabled = (d: string) => {
        const day = new Date(d).getDay(); // 0 = Sunday, 6 = Saturday
        const weekdayAvailable = local.available_weekdays.includes(day);
        const alreadyBooked = bookedDates.includes(d);

        return !weekdayAvailable || alreadyBooked;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!auth?.user) {
            setError('Entra en tu cuenta para reservar.');

            return;
        }

        if (!date) {
            setError('Por favor elija una fecha.');

            return;
        }

        if (isDateDisabled(date)) {
            setError('Fecha no disponible.');

            return;
        }

        setError(null);

        router.post(
            `/locals/${local.id}/book`,
            { booking_date: date },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSuccess('Reserva confirmada!');
                    setError(null);
                    setDate('');
                },
                onError: (errors) => {
                    setSuccess(null);
                    setError(errors.booking_date);
                },
            },
        );
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="mx-auto max-w-md">
            {error && <div className="mb-2 text-red-600">{error}</div>}
            {success && <div className="mb-2 text-green-600">{success}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col">
                    Selecciona la fecha:
                    <input
                        type="date"
                        value={date}
                        min={today}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 rounded border px-3 py-2"
                    />
                </label>

                <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-500">
                        No disponibles:
                    </span>
                    {bookedDates.map((d) => (
                        <span
                            key={d}
                            className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700"
                        >
                            {d}
                        </span>
                    ))}
                </div>

                <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    Confirmar reserva
                </button>
            </form>
        </div>
    );
}
