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

//actions
export function setVacReqTypes(types) {
    return {
        type: SET_VACREQ_TYPES,
        payload: {
            types: types
        }
    }
}

function formatDate(date) {

    return new Date(date).toLocaleDateString();
}

export function addHolidayRequest(object) {

    axios.post(VACREQUEST, object)
        .then(function (response) {
            sendMail(object);
            history.push('/urlopy-lista-wnioskow');
        });

}

function sendMail(object) {

    axios.post(MAIL, object)
        .then(function (response) {
            toastr.success('Wniosek został wysłany');
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

const initialState = {
    types: []
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_VACREQ_TYPES: {
            return action.payload;
        }
        default: return state;
    }
}
