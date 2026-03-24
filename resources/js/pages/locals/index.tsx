
import { Link } from '@inertiajs/react';
import Local from './local';
export default function Index({locals}:{locals:[]}) {
    return (
        <div>
            {locals.map(
                (
                    local: {
                        id: bigint;
                        name: string;
                        description: string;
                        hourlyRate: number;
                    },
                    index: number,
                ) => (
                    <Link key={local.id} href={`/local/${local.id}`}>
                        <Local
                            key={index}
                            name={local.name}
                            description={local.description}
                            hourlyRate={local.hourlyRate}
                        />
                    </Link>
                ),
            )}
        </div>
    );
}
