import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import * as Yup from 'yup';
import { VACATION_REQUEST_MAIL, VACREQUEST, VACREQ_TYPES, USERS } from '../../../routes';
import history from '../../../history';

export const validationSchema = Yup.object().shape({
    type: Yup.string()
        .required('Pole wymagane'),
    datefrom: Yup.date()
        .required('Pole wymagane')
        .max(Yup.ref('dateto'), ({ max }) => `Data nie może być większa od ${formatDate(max)}`),
    dateto: Yup.date()
        .required('Pole wymagane')
});

//action types
const SET_VACREQ_TYPES = 'SET_VACREQ_TYPES';
const SET_VACREQUESTS = 'SET_VACREQUESTS';
const UPDATE_RECORDS = 'UPDATE_RECORDS';


//actions
export function setVacReqTypes(types) {
    return {
        type: SET_VACREQ_TYPES,
        payload: {
            types: types
        }
    }
}

export function setVacRequests(records) {
    return {
        type: SET_VACREQUESTS,
        payload: {
            records: records
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

function formatDate(date) {

    return new Date(date).toLocaleDateString();
}

export const addHolidayRequest = (object) => {

    axios.post(VACREQUEST, object)
        .then(function (response) {
            sendMail(object, response.data.id);
        });
}

function sendMail(object, recordId) {

    axios.post(VACATION_REQUEST_MAIL, object)
        .then(function (response) {
            setVacRequestState(recordId);
            toastr.success('Wniosek został wysłany');
        });
}

function setVacRequestState(id) {

    // do wyniesienia do konfiguracji
    const headers = {
        'Content-Type': 'application/json'
    }

    const state = 2; //status: 2 czeka na akceptację

    axios.put(VACREQUEST + '/' + id, { state: state }, {
        headers: headers
    }).then((response) => {
        history.push('/urlopy-lista-wnioskow');
    });



}

export const fetchVacRequestTypes = () => {

    return (dispatch) => {
        axios.get(VACREQ_TYPES).then(response => {

            const types = response.data['hydra:member'].map(function (object) {
                return ({
                    'key': object.id,
                    'text': object.description,
                    'value': object.id
                })
            })
            dispatch(setVacReqTypes(types));
        })
    }
}

export const fetchAllRecords = (userId, filters) => {

    const datefrom = filters.dateFrom;
    const dateto = filters.dateTo

    return (dispatch) => {
        axios.get(USERS + '/' + userId + '/' + 'vacation_requests' + '?datefrom[after]=' + datefrom + '&datefrom[before]=' + dateto).then(response => {


            dispatch(setVacRequests(response.data['hydra:member']));
        })

    }
}

export const updateRecord = (id, newStatus, msg) => {

    const params = { state: newStatus };

    return (dispatch) => {
        return axios.put(VACREQUEST + '/' + id, params)
            .then((response) => {
                toastr.success(msg);
                dispatch(updateRecords(response.data));
                //history.push('/urlopy-lista-wnioskow');
            });
    }
}

const initialState = {
    types: []
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_VACREQ_TYPES: {
            return action.payload;
        }

        case SET_VACREQUESTS: {
            return { ...state, ...action.payload };
        }

        case UPDATE_RECORDS: {
            return { ...state, ...action.payload };
        }


        default: return state;
    }
}
