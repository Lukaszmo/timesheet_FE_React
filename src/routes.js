import { ROOT, API_ROOT } from './config.js';

//API
export const GENERATE = API_ROOT + 'token/generate';
export const USERS = API_ROOT + 'users';
export const HOUR_TYPES = API_ROOT + 'hour_types';
export const HOURS = API_ROOT + 'hours';
export const VACREQUEST = API_ROOT + 'vacation_requests';
export const VACREQ_TYPES = API_ROOT + 'vacreq_types';

//Services
export const MAIL = ROOT + 'mail';
export const USER_PROJECTS = ROOT + 'user_projects';
export const PROJECT_TASKS = ROOT + 'project_tasks';
export const HOURS_BY_TYPE = ROOT + 'hours/by_type';
export const HOURS_BY_PROJECT = ROOT + 'hours/by_project';
export const HOURS_BY_TASK = ROOT + 'hours/by_task';