export function getFirstDayOfMonth(date) {

    /**
    * Params: 
    * - date: obiekt new Date
    * 
    * Return:
    * - firstDate: data - pierwszy dzień miesiąca w formacie ('YYYY-MM-DD')
    * */

    const year = date.toISOString().slice(0, 4);
    const month = date.toISOString().slice(5, 7);
    const firstDay = '01';

    const firstDate = year + '-' + month + '-' + firstDay;

    return firstDate;
}

export function getLastDayOfMonth(date) {

    /**
    * Params: 
    * - date: obiekt new Date
    * 
    * Return:
    * - lastDate: data - ostatni dzień miesiąca w formacie ('YYYY-MM-DD')
    * */

    const year = date.toISOString().slice(0, 4);
    const month = date.toISOString().slice(5, 7);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toString().slice(8, 10);

    const lastDate = year + '-' + month + '-' + lastDay;

    return lastDate;
}

export function timeToNumber(timeFormat) {

    /**
    * Params: 
    * - timeFormat: parametr w formacie hh:mm np. 08:00
    * 
    * Return:
    * - floatNumber: wartość w postaci liczby zmiennoprzecinkowej
    *    
    * */

    const time = timeFormat.split(':');
    const hours = parseInt(time[0]);
    const minutes = parseInt(time[1]) / 60;
    const quantity = hours + minutes;

    return quantity;
}

export function numberToTime(numberFormat) {

    /**
    * Params: 
    * - numberFormat: parametr w formacie liczbowym np. 8.25
    * 
    * Return:
    * - timeFormat: wartość w formacie hh:mm
    *    
    * */

    const quantity = numberFormat.toString().split('.');
    const hours = quantity[0];
    let minutes = quantity[1] ? quantity[1] * 60 : '00';
    minutes = minutes.toString().substr(0, 2);
    const timeFormat = hours + ':' + minutes;

    return timeFormat;
}


