import axios from 'axios';
import { ROLE_ACCESS_LIST } from '../../../../routes';
import { toastr } from 'react-redux-toastr';

//action types
const SET_ROLE_ACCESS_LIST = 'SET_ROLE_ACCESS_LIST';

//actions
export function setRecords(records) {
    return {
        type: SET_ROLE_ACCESS_LIST,
        payload: {
            records: records
        }
    }
}


export const getRoleAccessList = () => {

    return (dispatch) => {

        axios.get(ROLE_ACCESS_LIST).then(response => {

            const data = response.data['hydra:member'].map(function (object) {
                return ({
                    ...object,
                    access: object.access === true ? 'tak' : 'nie'
                })
            })
            dispatch(setRecords(data));

        });
    }
}



const initialState = {
    records: []
};

//reducers
export default (state = initialState, action) => {

    switch (action.type) {

        case SET_ROLE_ACCESS_LIST: {
            return { ...state, ...action.payload };
        }

        //jeśli nie było żadnej akcji zwraca stan bez zmiany
        default: return state;
    }
}