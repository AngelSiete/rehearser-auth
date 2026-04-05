export type DayNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

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
    available_weekdays: DayNumber[];
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
