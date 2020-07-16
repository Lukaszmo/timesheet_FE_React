import axios from 'axios';
import { USERS } from '../../../routes';

const SET_USER = 'SET_USER';

//actions
export function setUserAction(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

//operations
export const getLoggedUser = (id) => {

    const token = localStorage.getItem('token');

    return (dispatch) => {
        return axios.get(USERS + '/' + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                dispatch(setUserAction(response.data));
                //console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export async function getUserDetails(id) {

    const token = localStorage.getItem('token');

    const resp = axios.get(USERS + '/' + id, { headers: { "Authorization": `Bearer ${token}` } })

    return await resp;
}

const initialState = {
    id: "",
    userclass: "",
    regnum: "",
    firstname: "",
    lastname: "",
    position: "",
    email: ""
};

//reducers
export default (state = initialState, action) => {
    switch (action.type) {

        case SET_USER: {
            return { ...state, ...action.payload };
        }

        default:
            return state;
    }
}






