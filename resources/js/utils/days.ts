export type DayNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const DAY_MAP: Record<DayNumber, string> = {
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado',
    7: 'Domingo',
};
export function translateDays(days: DayNumber[]): string[] {
    return days.map((day) => DAY_MAP[day]);
}
