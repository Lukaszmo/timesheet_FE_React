import axios from 'axios';
import { USERS } from '../../../../routes';
import { toastr } from 'react-redux-toastr';
import * as Yup from 'yup';

export const UserValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Pole wymagane')
        .max(15, 'Maksymalna ilość znaków: 15'),
    password: Yup.string()
        .required('Pole wymagane')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}$/, 'Hasło powinno zawierać co najmniej 7 znaków, w tym jedną cyfrę, jedną małą i jedną dużą literę'),
    firstname: Yup.string()
        .required('Pole wymagane')
        .max(30, 'Maksymalna ilość znaków: 30'),
    lastname: Yup.string()
        .required('Pole wymagane')
        .max(40, 'Maksymalna ilość znaków: 40'),
    regnum: Yup.string()
        .required('Pole wymagane')
        .max(5, 'Maksymalna ilość znaków: 5'),
    email: Yup.string()
        .required('Pole wymagane')
        .max(254, 'Maksymalna ilość znaków: 254'),
    position: Yup.string()
        .max(30, 'Maksymalna ilość znaków: 30'),
    roles: Yup.string()
        .required('Pole wymagane')

});

export function addUser(object) {

    console.log(object);

    axios.post(USERS, object)
        .then(function (response) {
            toastr.success('Użytkownik został utworzony');
        })
        .catch(function (error) {
            console.log(error);
            toastr.error(error.response.data['hydra:description']);
        });
}


export async function getAllUsers() {

    const resp = axios.get(USERS).then(response => response.data['hydra:member'].map(function (object) {
        return ({
            ...object,
            active: + object.active,
            activeString: object.active == 1 ? 'tak' : 'nie'
        })
    }));

    return await resp;
}

export async function getAllUsersWithFilters(filters) {

    let active = filters ? filters.active : true;

    const resp = axios.get(USERS + '?active=' + active).then(response => response.data['hydra:member']);

    return await resp;
}

export const generateUserListForDropdown = (userList) => {

    let dropdownList = null

    if (userList.length > 0) {

        dropdownList = userList.map((object) => {
            return {
                'key': object.id,
                'text': object.firstname + ' ' + object.lastname,
                'value': object.id
            };
        });
    }

    return dropdownList;
}

export const updateRecord = (values) => {

    return axios.put(USERS + '/' + values.id, values).then((response) => {
        toastr.success('Dane zostały zmodyfikowane');
    })
        .catch(function (error) {
            toastr.error(error.response.data['hydra:description']);
        });
}