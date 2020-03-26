import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { HOUR_TYPES, HOURS } from '../../../routes';
import * as Yup from 'yup';

export const HourValidationSchema = Yup.object().shape({
    type: Yup.string()
        .required('Pole wymagane'),
    date: Yup.date()
        .required('Pole wymagane'),
    quantity: Yup.number()
        .required('Pole wymagane')
});

//action types
const SET_HOUR_TYPES = 'SET_HOUR_TYPES';
const SET_RECORDS = 'SET_RECORDS';
const ADD_RECORD = 'ADD_RECORD';
const DELETE_RECORD = 'DELETE_RECORD';
const UPDATE_RECORDS = 'UPDATE_RECORDS';

//actions
export function setHourTypes(types) {
    return {
        type: SET_HOUR_TYPES,
        payload: {
            types: types
        }
    }
}

export function setRecords(records) {
    return {
        type: SET_RECORDS,
        payload: {
            records: records
        }
    }
}

export function addNewRecord(object) {
    return {
        type: ADD_RECORD,
        payload: object

    }
}

export function deleteRecord(id) {
    return {
        type: DELETE_RECORD,
        payload: {
            deletedRecordId: id
        }
    }
}

export function updateRecords(record) {
    return {
        type: UPDATE_RECORDS,
        payload: {
            updatedRecord: record
        }
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

    //tests
    /*const response = [
        { id: 1, email: "email1@email.com", phone: "111111111" },
        { id: 2, email: "email2@email.com", phone: "222222222" },
        { id: 3, email: "email3@email.com", phone: "333333333" },
        { id: 4, email: "email4@email.com", phone: "444444444" },
        { id: 5, email: "email5@email.com", phone: "555555555" },
        { id: 6, email: "email6@email.com", phone: "666666666" }
    ]
 
    return (dispatch) => {
        dispatch(setRecords(response));
 
    } */
    const userid = localStorage.getItem('userId');

    return (dispatch) => {
        axios.get(HOURS + '?userid=' + userid).then(response => {
            dispatch(setRecords(response.data['hydra:member']));
            console.log(response.data['hydra:member']);
        })

    }
}

export const addRecord = (object) => {

    return function (dispatch) {

        let userid = parseInt(localStorage.getItem("userId"));
        let newrecord = { ...object, userid };

        axios.post(HOURS, newrecord)
            .then(function (response) {
                toastr.success('Rekord został zapisany');
                dispatch(addNewRecord(response.data));
            });
    }
}

export const removeRecord = (rowId) => {

    return function (dispatch) {
        axios.delete(HOURS + '/' + rowId)
            .then(function (response) {
                toastr.success('Rekord został usunięty');
                dispatch(deleteRecord(rowId));
            });
    }
}

export const updateRecord = (id, values) => {

    // do wyniesienia do konfiguracji
    const headers = {
        'Content-Type': 'application/json'
    }

    console.log(id, values);
    return function (dispatch) {

        axios.put(HOURS + '/' + id, values, {
            headers: headers

        })
            .then(function (response) {
                toastr.success('Rekord został zmodyfikowany');
                console.log(response.data);
                dispatch(updateRecords(response.data));

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

        case ADD_RECORD: {
            return { ...state, records: [...state.records, action.payload] }
        }

        case DELETE_RECORD: {

            let filteredArray = state.records.filter(item => item.id !== action.payload.deletedRecordId)

            return { ...state, records: filteredArray }
        }

        case UPDATE_RECORDS: {

            let index = state.records.findIndex(item => item.id == action.payload.updatedRecord.id);

            return {
                ...state,
                records: [
                    ...state.records.slice(0, index),      // wycina to co przed indexem
                    action.payload.updatedRecord,          // wrzuca rekord
                    ...state.records.slice(1 + index)      // dodaje to co pozostało
                ]
            }
        }

        //jeśli nie było żadnej akcji zwraca stan bez zmiany
        default: return state;
    }
}