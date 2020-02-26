import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr'

import loader from './app/common/Loader/Loader';
import login from './app/features/Login/Login';
import user from './app/features/User/User';
import hour from './app/features/Hours/Hours';



export default combineReducers({
    toastr: toastrReducer,
    login: login,
    user: user,
    hour: hour,
    loader: loader,
})