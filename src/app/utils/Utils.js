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


