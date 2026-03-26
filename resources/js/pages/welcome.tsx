import { Head, Link, usePage } from '@inertiajs/react';
import Index from '@/pages/locals';

type LocalType = {
    id: number;
    name: string;
    description: string;
    hourlyRate?: number;
    city: string;
    direction: string;
    musicianCapacity: number;
    hasEquipment: boolean;
};
export default function Welcome({
    locals
}: {
    locals: LocalType[];
}) {

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <h2 className="text-3xl text-white">
                    Nuestros locales más recientes
                </h2>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main>
                        <Index locals={locals} />
                        <Link
                            href="/locals"
                            className="rounded-sm border border-transparent px-5 py-1.5 text-xl leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A] m-auto flex justify-center"
                        >
                           Ve todos nuestros locales
                        </Link>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
