
import { Link } from '@inertiajs/react';
import Local from './local';

type LocalType = {
    id: number;
    name: string;
    description: string;
    hourlyRate: number;
};
export default function Index({ locals }: { locals: LocalType[] }) {

    return (
        <div className="locals-index">
            {locals.map((local: LocalType) => (
                <Link key={local.id} href={`/local/${local.id}`}>
                    <Local
                        local={{
                            id: local.id,
                            name: local.name,
                            description: local.description,
                            hourlyRate: local.hourlyRate,
                        }}
                    />
                </Link>
            ))}
        </div>
    );
}
