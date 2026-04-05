import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type SearchBarProps = {
    initialSearch?: string;
    initialMaxPrice?: number;
    initialDays?: number[];
};

type Filters = {
    search?: string;
    maxPrice?: number;
    days?: number[];
};

const weekdays = [
    { id: 0, label: 'Domingo' },
    { id: 1, label: 'Lunes' },
    { id: 2, label: 'Martes' },
    { id: 3, label: 'Miércoles' },
    { id: 4, label: 'Jueves' },
    { id: 5, label: 'Viernes' },
    { id: 6, label: 'Sábado' },
];

export default function SearchBar({
    initialSearch = '',
    initialMaxPrice,
    initialDays = [],
}: SearchBarProps) {
    const [filters, setFilters] = useState<Filters>({
        search: initialSearch,
        maxPrice: initialMaxPrice,
        days: initialDays,
    });

    // 🔁 Debounced search + filters
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                '/locals',
                {
                    search: filters.search || undefined,
                    maxPrice: filters.maxPrice || undefined,
                    days: filters.days?.length
                        ? filters.days.join(',')
                        : undefined,
                },
                { preserveState: true, replace: true, preserveScroll: true },
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [filters]);

    const handleClearSearch = () =>
        setFilters((prev) => ({ ...prev, search: '' }));

    const toggleDay = (day: number) => {
        setFilters((prev) => ({
            ...prev,
            days: prev.days?.includes(day)
                ? prev.days.filter((d) => d !== day)
                : [...(prev.days || []), day],
        }));
    };

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            {/* 🔍 Text search */}
            <div className="relative w-full md:w-64">
                <input
                    type="text"
                    value={filters.search}
                    onChange={(e) =>
                        setFilters({ ...filters, search: e.target.value })
                    }
                    placeholder="Buscar locales..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 shadow-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
                {filters.search && (
                    <button
                        onClick={handleClearSearch}
                        className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* 💰 Max price */}
            <input
                type="number"
                value={filters.maxPrice ?? ''}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        maxPrice: Number(e.target.value) || undefined,
                    })
                }
                placeholder="Max Price €"
                className="w-full rounded border px-3 py-2 md:w-32"
            />

            {/* 📅 Days filter */}
            <div className="flex gap-2">
                {weekdays.map((day) => (
                    <button
                        key={day.id}
                        onClick={() => toggleDay(day.id)}
                        className={`rounded border px-2 py-1 ${
                            filters.days?.includes(day.id)
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700'
                        }`}
                    >
                        {day.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
