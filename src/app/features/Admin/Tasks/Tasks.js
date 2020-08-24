import axios from 'axios';
import { PROJECT_TASKS } from '../../../../routes';



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



