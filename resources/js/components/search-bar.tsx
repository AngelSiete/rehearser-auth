import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type SearchBarProps = {
    initialSearch?: string;
};

export default function SearchBar({ initialSearch = '' }: SearchBarProps) {
    const [search, setSearch] = useState<string>(initialSearch);

    // 🔁 Debounced search
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                '/locals',
                { search: search || undefined }, // avoids ?search=
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                },
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    // ❌ Clear input
    const handleClear = () => {
        setSearch('');
    };

    return (
        <div className="relative w-full max-w-md">
            {/* 🔍 Input */}
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar locales..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 shadow-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />

            {/* ❌ Clear button */}
            {search && (
                <button
                    onClick={handleClear}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                    ✕
                </button>
            )}
        </div>
    );
}
