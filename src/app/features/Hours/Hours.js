import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { HOUR_TYPES, HOURS } from '../../../routes';

//action types
const SET_HOUR_TYPES = 'SET_HOUR_TYPES';
const SET_RECORDS = 'SET_RECORDS';
const ADD_RECORD = 'ADD_RECORD';
const DELETE_RECORD = 'DELETE_RECORD';

//actions
function setHourTypes(types) {
    return {
        type: SET_HOUR_TYPES,
        payload: {
            types: types
        }
    }
}

function setRecords(records) {
    return {
        type: SET_RECORDS,
        payload: {
            records: records
        }
    }
}

function addNewRecord(object) {
    return {
        type: ADD_RECORD,
        payload: {
            records: object
        }
    }
}

function deleteRecord(id) {
    return {
        type: DELETE_RECORD,
        payload: id
    }
}

//operations
export const fetchAllTypes = () => {

    //do zrobienia Api
    const response = [
        { key: 1, text: "Regularne godziny pracy", value: "TYPE1" },
        { key: 2, text: "Nadgodziny", value: "TYPE2" },
        { key: 3, text: "Nieobecność", value: "TYPE3" }
    ]

    /*return (dispatch) => {
        axios.get(HOUR_TYPES).then(response => {
            dispatch(setHourTypes(response.data));

        })
    } */

    return (dispatch) => {
        dispatch(setHourTypes(response));
        console.log(response);

    }

}

export const fetchAllRecords = () => {

    //do zrobienia Api
    const response = [
        { id: 1, email: "email1@email.com", phone: "111111111" },
        { id: 2, email: "email2@email.com", phone: "222222222" },
        { id: 3, email: "email3@email.com", phone: "333333333" },
        { id: 4, email: "email4@email.com", phone: "444444444" },
        { id: 5, email: "email5@email.com", phone: "555555555" },
        { id: 6, email: "email6@email.com", phone: "666666666" }
    ]


    /*return (dispatch) => {
        axios.get(HOUR_TYPES).then(response => {
            dispatch(setHourTypes(response.data));

        })
    } */

    return (dispatch) => {
        dispatch(setRecords(response));
        console.log(response);

    }
}

export const addRecord = (object) => {

    return function (dispatch) {

        let userid = parseInt(localStorage.getItem("userId"));
        let newrecord = { ...object, userid };

        axios.post(HOURS, newrecord)
            .then(function (response) {
                toastr.success('Rekord został zapisany');
                dispatch(addNewRecord(newrecord));
            })
            .catch(function (error) {
                console.log(error);
                toastr.error("Błąd zapisu");
                //dispatch(InsertFail());
            });
    }
}

const initialState = {
    types: [],
    records: []
};

//reducers
export default (state = initialState, action) => {
    switch (action.type) {

        case SET_HOUR_TYPES: {
            return action.payload;

        }
        case SET_RECORDS: {
            return { ...state, ...action.payload };
        }

        //jeśli nie było żadnej akcji zwraca stan bez zmiany
        default: return state;
    }
}