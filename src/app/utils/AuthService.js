
import { parseStringToObject } from '../utils/Utils';

// const tokenLifeTime = 360000;
const tokenKey = 'token';
const expirationDateKey = 'token-expiration-date';

export function getToken() {
    return localStorage.getItem(tokenKey);
}

export function isAuthenticated() {
    // return getToken() !== null && getExpirationDate() > (new Date()).getTime();
    return getToken() !== null;
    //póki co zawsze autentykacja jest poprawna
    //return 1;
}


export const checkMenuAccess = (accessItem) => {

    let accessMode = false;

    let accessList = new Map(JSON.parse(localStorage.getItem('items')));

    accessList.forEach(function (el, index) {
        if (el.item === accessItem) {
            accessMode = el.access;
            return accessMode;
        }
    })

    return accessMode;
}








