import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { MAIL } from '../../../routes';

export function sendMail(object) {

    axios.post(MAIL, object)
        .then(function (response) {
            toastr.success('Wniosek został wysłany');
        });

}