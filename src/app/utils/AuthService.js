
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


export const checkMenuAccess = (accessItem, accessList) => {

    let accessMode = false;

    accessList.forEach(function (value, key) {
        if (accessList[key].item === accessItem) {
            accessMode = accessList[key].access;
            return accessMode;
        }
    })

    return accessMode;
}


