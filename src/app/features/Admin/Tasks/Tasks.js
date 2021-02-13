import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { TASKS } from '../../../../routes';
import { PROJECT_TASKS } from '../../../../routes';
import * as Yup from 'yup';

export const TaskValidationSchema = Yup.object().shape({
    code: Yup.string()
        .required('Pole wymagane')
        .max(10, 'Maksymalna ilość znaków: 10'),
    description: Yup.string()
        .required('Pole wymagane')
        .max(50, 'Maksymalna ilość znaków: 50'),
    type: Yup.string()
        .required('Pole wymagane')
});

const CREATE_TASK = 'CREATE_TASK';


// actions
export function addNewRecord(object) {
    return {
        type: CREATE_TASK,
        payload: object
    }
}

export const createTask = (object) => {

    return function (dispatch) {
        axios.post(TASKS, object)
            .then(function (response) {
                toastr.success('Zadanie zostało utworzone');
                dispatch(addNewRecord(response.data));
            })
            .catch(function (error) {
                console.log(error);
                toastr.error(error.response.data['hydra:description']);
            });
    }
}

//////////////////////////  do przeniesienia do ProjectTasks
export async function fetchProjectTasks(projectId) {

    const resp = axios.get(PROJECT_TASKS + '/' + projectId);

    return await resp;
}

export const generateTasksForDropdown = (taskList) => {

    let dropdownList = null

    if (taskList.length > 0) {

        dropdownList = taskList.map((object) => {
            return {
                key: object.id,
                value: object.id,
                text: object.description
            };
        });
    }

    return dropdownList;
};

////////////////////////////////////////////////////////////////////////////

const initialState = {
    records: []
};

//reducers
export default (state = initialState, action) => {

    switch (action.type) {

        /*  case SET_TASKS: {
              return { ...state, ...action.payload };
          } */

        case CREATE_TASK: {
            return { ...state, records: state.records ? [...state.records, action.payload] : [action.payload] }
        }

        /*
        case DELETE_TASK: {

            let filteredArray = state.records.filter(item => item.id !== action.payload.deletedRecordId)

            return { ...state, records: filteredArray }
        }

        case UPDATE_TASK: {

            let index = state.records.findIndex(item => item.id === action.payload.updatedRecord.id);

            return {
                ...state,
                records: [
                    ...state.records.slice(0, index),
                    action.payload.updatedRecord,
                    ...state.records.slice(1 + index)
                ],
                updatedRecord: action.payload.updatedRecord
            }
        } */

        //jeśli nie było żadnej akcji zwraca stan bez zmiany
        default: return state;
    }
}
