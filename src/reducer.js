import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr'

import loader from './app/common/Loader/Loader';
import login from './app/features/Login/Login';
import user from './app/features/User/User';
import hour from './app/features/Hours/Hours';
import vacation from './app/features/Vacation/Vacation';
import menu from './app/common/Menu/Menu';
import client from './app/features/Admin/Clients/Client';
import project from './app/features/Admin/Projects/Project';
import projectUsers from './app/features/Admin/ProjectUsers/ProjectUsers';

/*export default combineReducers({
    toastr: toastrReducer,
    login: login,
    user: user,
    hour: hour,
    loader: loader,
    vacation: vacation,
    menu: menu
}) */

const appReducer = combineReducers({
    toastr: toastrReducer,
    login: login,
    user: user,
    hour: hour,
    loader: loader,
    vacation: vacation,
    menu: menu,
    client: client,
    project: project,
    projectUsers: projectUsers,
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {

        // clear local storage and state after logout
        localStorage.clear();
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer;