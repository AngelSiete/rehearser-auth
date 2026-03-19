
import Local from './local';
export default function Index({locals}:{locals:[]}) {
    return (
        <div>
            {locals.map((local: { name: string, description:string, hourlyRate: number }, index: number) => (
                <Local key={index} name={local.name} description={local.description} hourlyRate={local.hourlyRate} />
            ))}
        </div>
    );
}
