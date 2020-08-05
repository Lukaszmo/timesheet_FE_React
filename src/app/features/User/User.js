import axios from 'axios';
import { USERS } from '../../../routes';

const SET_USER = 'SET_USER';
const SET_INFERIORS = 'SET_INFERIORS';

//actions
export function setUserAction(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function setInferiors(inferiors) {
    return {
        type: SET_INFERIORS,
        payload: {
            inferiors: inferiors
        }
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

export const fetchInferiors = (managerId) => {

    return (dispatch) => {
        return axios.get(USERS + '?managerid=' + managerId).then(response => {

            dispatch(setInferiors(response.data['hydra:member']));
        });

    }
}

export const generateUserListForDropdown = (listOfInferiors, loggedUser) => {

    const listOfUsers = listOfInferiors.map((object) => {
        return {
            key: object.id,
            value: object.id,
            text: object.firstname + ' ' + object.lastname
        };
    });

    const userName = loggedUser.firstname + ' ' + loggedUser.lastname;
    const loggedUserId = loggedUser.id;

    listOfUsers.push({ key: loggedUserId, text: userName, value: loggedUserId });

    return listOfUsers;
};

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

        case SET_INFERIORS: {
            return { ...state, ...action.payload };

        }

        default:
            return state;
    }
}






