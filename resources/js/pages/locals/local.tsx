export default function Local({ name, description, hourlyRate }: { name:string,description:string,hourlyRate:number }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    );
};
