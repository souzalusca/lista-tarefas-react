import { format } from 'date-fns';

export function formatDate(date: Date) {
    return format(date, 'dd/MM/yyyy HH:mm:ss');
}

export const dateTimealive = new Date( Date.now() );
