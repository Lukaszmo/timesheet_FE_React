import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import * as Yup from 'yup';
import { MAIL, VACREQUEST, VACREQ_TYPES } from '../../../routes';
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

    axios.post(MAIL, object)
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

export const fetchAllRecords = (userId) => {

    return (dispatch) => {
        axios.get(VACREQUEST + '?userid=' + userId).then(response => {

            dispatch(setVacRequests(response.data['hydra:member']));
        })

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


        default: return state;
    }
}
