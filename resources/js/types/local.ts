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

export type FormData = {
    name: string;
    description: string;
    hourlyRate: string;
    city: string;
    direction: string;
    musicianCapacity: string;
    hasEquipment: boolean;
    available_weekdays: number[];
};

export type Weekday = {
    label: string;
    value: number;
};
