import { Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
    canRegister?: boolean;
}) {
    const { auth, canRegister } = usePage().props as any;

    return (
        <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:p-8 dark:bg-[#0a0a0a]">
            <header className="mb-6 w-full text-sm not-has-[nav]:hidden lg:max-w-4xl">
                <nav className="flex items-center justify-between gap-4">
                    {auth.user ? (
                        <>
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Panel de Usuario
                            </Link>
                            <Link
                                href="/"
                                className="rehearser-title inline-block px-5 py-1.5 text-xl leading-normal text-[#1b1b18] hover:border-[#19140035] hover:text-2xl dark:text-[#EDEDEC]"
                            >
                                Rehearser
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Login
                            </Link>
                            <Link
                                href="/"
                                className="rehearser-title inline-block px-5 py-1.5 text-xl leading-normal text-[#1b1b18] hover:border-[#19140035] hover:text-2xl dark:text-[#EDEDEC]"
                            >
                                Rehearser
                            </Link>
                            {canRegister && (
                                <Link
                                    href={register()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Crea tu cuenta
                                </Link>
                            )}
                        </>
                    )}
                </nav>
            </header>

            <main className="w-full max-w-4xl">{children}</main>
            <div className="hidden h-14.5 lg:block"></div>
            <footer className="m-auto flex w-2/4 flex-col justify-around md:flex-row">
                <Link
                    href="/faq"
                    className="text-m inline-block rounded-sm border border-[#19140035] px-5 py-1.5 leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                >
                    Preguntas frecuentes
                </Link>
                <Link
                    href="/somos"
                    className="text-m inline-block rounded-sm border border-[#19140035] px-5 py-1.5 leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                >
                    ¿Quiénes somos?
                </Link>
            </footer>
        </div>
    );
}
