import * as Loader from '../common/Loader/Loader';
import { store } from '../../store';
import { toastr } from 'react-redux-toastr';

const ErrorHandler = (error) => {

    if (error.response.status === 401) {
        toastr.error("Błąd autoryzacji");
    }
    else {
        toastr.error("Błąd");
    }

    store.dispatch(Loader.hideLoader());
    return Promise.reject(error);
}

export default ErrorHandler;