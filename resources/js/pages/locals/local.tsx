import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

import BookingForm from '@/pages/locals/booking-form';
import type { LocalType } from '@/types/local';
import { translateDays } from '@/utils/days';
export default function Local({ local } : {local: LocalType}) {
    const { auth } = usePage().props;
    const isLocalPage : boolean = usePage().url.startsWith('/local/');
    const isOwner : boolean = auth?.user?.id === local.user_id;
    const [showBookingForm, setShowBookingForm] = useState(false);
    const toggleBookingForm = () => setShowBookingForm((prev) => !prev);
    const translatedDays = local.available_weekdays
        ? translateDays(local.available_weekdays)
        : null;

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
            <div className="days mt-4 flex flex-col">
                <span className="text-gray-400">Disponibilidad</span>
                <span className="font-semibold text-gray-800 dark:text-white">
                    {translatedDays ? translatedDays.join(', ') : '—'}
                </span>
            </div>
            {auth?.user && isLocalPage &&!isOwner && (
                <button
                    onClick={toggleBookingForm}
                    className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    {showBookingForm ? 'Cancelar' : 'Reservar'}
                </button>
            )}

            {showBookingForm && isLocalPage && (
                <BookingForm
                    local={local}
                    bookedDates={local.booked_dates ?? []}
                />
            )}
            {isOwner && isLocalPage && (
                <Link
                    href={`/locals/${local.id}/edit`}
                    className="btn-edit rounded-full bg-blue-800 px-3 py-1 text-white dark:bg-blue-600"
                >
                    Editar
                </Link>
            )}
        </div>
    );
};
