import axios from 'axios';
import { PROJECTS } from '../../../../routes';

export async function fetchAllProjects() {

    const resp = axios.get(PROJECTS).then(response => response.data['hydra:member'].map(function (object) {
        return ({
            'key': object.id,
            'text': object.description,
            'value': object.id
        })
    }));

    return await resp;
}