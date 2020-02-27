import axios from 'axios'
import * as Loader from '../common/Loader/Loader'
import { store } from '../../store'
import ErrorHandler from './ErrorHandler';


export const setAxiosInterceptor = () => {
    axios.interceptors.response.use(response => {
        store.dispatch(Loader.hideLoader());
        return response;
    }, ErrorHandler);
    axios.interceptors.request.use((config) => {

        store.dispatch(Loader.showLoader());
        return config;
    }, error => Promise.reject(error))
}