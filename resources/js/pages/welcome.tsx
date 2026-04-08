import { Head, Link } from '@inertiajs/react';
import Index from '@/pages/locals';
import type { LocalType } from '@/types/local';

export default function Welcome({
    locals
}: {
    locals: LocalType[];
}) {

    return (
        <>
            <Head title="Inicio">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <img src="/banner.png" alt="rehearser logo" className="md:w-2/3 m-auto"/>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <h2 className="text-3xl dark:text-white">
                    Nuestros locales más recientes
                </h2>
                <div className="flex w-fulljustify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 align-top">
                    <main className="mt-8">
                        <Index locals={locals}/>
                        <Link
                            href="/locals"
                            className="barra-buscar mt-6 rounded-sm border border-transparent px-5 py-1.5 text-xl leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A] m-auto flex justify-center"
                        >
                           Busca entre todos nuestros locales
                        </Link>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
