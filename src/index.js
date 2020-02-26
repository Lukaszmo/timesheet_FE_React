import React from 'react';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { Provider } from 'react-redux'
import App from './app/App';
import { persistor, store } from '../src/store';
import history from './history';
import ReduxToastr from 'react-redux-toastr';
import { setAxiosInterceptor } from '../src/app/utils/AxiosInterceptor.js';
import LoaderContainer from './app/common/Loader/LoaderContainer'
//import 'semantic-ui-css/semantic.min.css';

setAxiosInterceptor();

ReactDOM.render(
    //Provider przekazuje stan ze stora do komponentow
    < Provider store={store} >
        <Router history={history}>
            <LoaderContainer />
            <ReduxToastr position='top-center' />
            <App />
        </Router>
    </Provider >,
    document.getElementById('root'));

