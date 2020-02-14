import axios from 'axios';
//import { toastr } from 'react-redux-toastr';
import history from '../../../history';
import { GENERATE } from '../../../routes';

//action types
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

//actions
function loginSuccess(userId) {
    return {
        type: LOGIN_SUCCESS,
    }
}

function loginFail() {
    return {
        type: LOGIN_FAIL,
    }
}

//operations
export function userLoginOperation(user) {
    return function (dispatch) {
        //UserService.setUserCredentials

        const userToAuthenticate = {
            username: user.login,
            password: user.password
        }

        axios.post(GENERATE, userToAuthenticate)
            .then(function (response) {
                //console.log(response);
                dispatch(loginSuccess(response.data.userId));
                //toastr.success("Login successfully", null);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                history.push('/home');
            })
            .catch(function (error) {
                console.log(error);
                //toastr.error("Login failed", null);
                dispatch(loginFail());
            });
    }
}

const initialState = {
    loginFailureCounter: 0
}

//reducers
export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_FAIL: {
            return {
                ...state,
                loginFailureCounter: ++state.loginFailureCounter
            };
        }
        case LOGIN_SUCCESS: {
            //return { ...state, loginFailureCounter: 0, "userId": action.payload.userId };
            return {
                ...state,
                loginFailureCounter: 0
            };
        }
        //jeśli nie było żadnej akcji zwraca stan bez zmiany
        default: return state;
    }
}