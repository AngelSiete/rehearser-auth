
import { Link, usePage } from '@inertiajs/react';
import SearchBar from '@/components/search-bar';
import type { LocalType } from '@/types/local';
import Local from './local';

type LocalsProp = LocalType[] | { data: LocalType[] };
export default function Index({ locals }: { locals: LocalsProp }) {
    const { filters } = usePage().props as {
        filters: { search?: string };
    };
    const isNotWelcomePage =
        usePage().url !== '/' && usePage().url !== '/owner/dashboard';
    const localsArray = Array.isArray(locals) ? locals : locals.data;
    const isLocalsEmpty = localsArray.length === 0;

    return (
        <>
            {isNotWelcomePage &&
                <div className="mb-6">
                    <SearchBar initialSearch={filters.search || ''} />
                </div>
            }
            <div className="locals-index grid grid-cols-1 gap-6 md:grid-cols-3">
                {isLocalsEmpty && (
                    <h2 className="text-center md:w-120 dark:text-white">
                        Parece que no hay locales que coincidan con tu búsqueda!
                    </h2>
                )}
                {localsArray.map((local: LocalType) => (
                    <Link
                        key={local.id}
                        href={`/local/${local.id}`}
                        className="rounded-lg p-4 shadow"
                    >
                        <Local local={local} />
                    </Link>
                ))}
            </div>
        </>
    );
}
