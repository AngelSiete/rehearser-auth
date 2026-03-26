import { Link } from '@inertiajs/react';

export default function NotFound(){
    return (
        <>
            <h1 className="m-auto w-full text-center text-6xl text-white">
                404
            </h1>
            <h2 className="mt-5 text-center text-4xl text-white">
                No hemos encontrado ésta página
            </h2>
            <h1 className="mt-5 text-center text-2xl text-white">
                Date una vuelta por nuestros locales ;)
            </h1>
            <Link
                href="/">
            <img
                src="/banner.png"
                alt="rehearser logo"
                className="m-auto md:w-2/3 mt-4"
            />
            </Link>
        </>
    );
}
