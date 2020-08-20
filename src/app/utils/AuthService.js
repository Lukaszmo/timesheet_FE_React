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

