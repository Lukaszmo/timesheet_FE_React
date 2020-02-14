import axios from 'axios';

import { HOUR_TYPES } from '../../../routes';

//action types
const SET_HOUR_TYPES = 'SET_HOUR_TYPES'

//actions
function setHourTypes(hourTypes) {
    return {
        type: SET_HOUR_TYPES,
        payload: hourTypes
    }
}

//operations
export const fetchAllTypes = () => {

    //do zrobienia Api
    const response = [
        { key: 1, text: "TYPE1", value: "type1" },
        { key: 2, text: "TYPE2", value: "type2" },
        { key: 3, text: "TYPE3", value: "type3" }
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

const initialState = []

//reducers
export default (state = initialState, action) => {
    switch (action.type) {

        case SET_HOUR_TYPES: {
            return action.payload
        }
        //jeśli nie było żadnej akcji zwraca stan bez zmiany
        default: return state;
    }
}