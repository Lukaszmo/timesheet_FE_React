import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import * as Yup from 'yup';
import { MAIL, VACREQUEST } from '../../../routes';
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
