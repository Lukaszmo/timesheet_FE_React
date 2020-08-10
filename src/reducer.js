import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr'

import loader from './app/common/Loader/Loader';
import login from './app/features/Login/Login';
import user from './app/features/User/User';
import hour from './app/features/Hours/Hours';
import vacation from './app/features/Vacation/Vacation';
import menu from './app/common/Menu/Menu';

export default combineReducers({
    toastr: toastrReducer,
    login: login,
    user: user,
    hour: hour,
    loader: loader,
    vacation: vacation,
    menu: menu
})