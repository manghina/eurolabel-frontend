import * as moment from 'moment';
//export const baseUrl = "http://localhost:8000/";
export const baseUrl = "https://app.eulabel.it/backend/";
export const dummyData = true;

export function dateToSql(string) {
    if (!string)
        return null
    return moment(string).format('YYYY/MM/DD')
}

export function dateFromSql(string) {
    if (!string || !isValidDate(string) || moment(string).year() == 1970)
        return null
    return new Date(moment(string).format('YYYY/MM/DD'))
}

function isValidDate(string: any) {
    return moment(string).isValid()
}