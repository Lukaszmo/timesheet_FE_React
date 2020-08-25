import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import history from '../../../history';

import { HOUR_TYPES, HOURS, USERS } from '../../../routes';
import * as Yup from 'yup';

export const HourValidationSchema = Yup.object().shape({
    type: Yup.string()
        .required('Pole wymagane'),
    date: Yup.date()
        .required('Pole wymagane'),
    quantity: Yup.number()
        .required('Pole wymagane')
        .positive('Tylko wartości dodatnie'),
    project: Yup.string()
        .required('Pole wymagane'),
    task: Yup.string()
        .required('Pole wymagane'),
    comment: Yup.string()
        .max(50, 'Zbyt długi komentarz')
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

    //do testów
    /*const response = [
        { key: 1, text: "Regularne godziny pracy", value: "TYPE1" },
        { key: 2, text: "Nadgodziny", value: "TYPE2" },
        { key: 3, text: "Nieobecność", value: "TYPE3" }
    ] */

    /*return (dispatch) => {
        dispatch(setHourTypes(response));
        console.log(response);

    }*/

    return (dispatch) => {
        axios.get(HOUR_TYPES).then(response => {

            const types = response.data['hydra:member'].map(function (object) {
                return ({
                    'key': object.id,
                    'text': object.description,
                    'value': object.id
                })
            })

            dispatch(setHourTypes(types));
        })
    }

}

export const fetchAllRecords = (userId, filters) => {

    const datefrom = filters.dateFrom;
    const dateto = filters.dateTo

    return (dispatch) => {

        axios.get(USERS + '/' + userId + '/' + 'hours' + '?date[after]=' + datefrom + '&date[before]=' + dateto).then(response => {

            dispatch(setRecords(response.data['hydra:member']));
        })

    }
}

export const addRecord = (object, userid) => {

    return function (dispatch) {

        if (object.type === 2) object = { ...object, overtacceptance: 0 };

        let newrecord = { ...object, userid };

        axios.post(HOURS, newrecord)
            .then(function (response) {
                toastr.success('Rekord został zapisany');
                dispatch(addNewRecord(response.data));
                history.push('/czas-pracy-lista');
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

export const updateRecord = (id, values, msg) => {

    // do wyniesienia do konfiguracji
    const headers = {
        'Content-Type': 'application/json'
    }

    return (dispatch) => {
        return axios.put(HOURS + '/' + id, values, {
            headers: headers
        })
            .then((response) => {
                toastr.success(msg);
                dispatch(updateRecords(response.data));
                history.push('/czas-pracy-lista');
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
            return { ...state, records: state.records ? [...state.records, action.payload] : [action.payload] }
        }

        case DELETE_RECORD: {

            let filteredArray = state.records.filter(item => item.id !== action.payload.deletedRecordId)

            return { ...state, records: filteredArray }
        }

        case UPDATE_RECORDS: {

            let index = state.records.findIndex(item => item.id === action.payload.updatedRecord.id);

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