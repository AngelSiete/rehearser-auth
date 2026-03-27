export type LocalType = {
    id: number;
    user_id: number;
    name: string;
    description: string;
    hourlyRate?: number;
    city: string;
    direction: string;
    musicianCapacity: number;
    hasEquipment: boolean;
    available_weekdays: number[];
};
