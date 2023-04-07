import dateHelper from 'date-and-time';

export const printableDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return dateHelper.format(date, 'YYYY/MM/DD HH:mm:ss')
}
