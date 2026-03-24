type LocalType = {
    id: number;
    name: string;
    description?: string;
    hourlyRate?: number;
};
export default function Local({ local } : {local: LocalType}) {
    return (
        <div>
            <h2>{local.name}</h2>
            <p>{local.description}</p>
            <span>{local.hourlyRate}€/h</span>
        </div>
    );
};
