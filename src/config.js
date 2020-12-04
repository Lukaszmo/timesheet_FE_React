var env = 'DEV';


if (env === 'DEV') {
    var PhpRoot = 'timesheet.symfony.local/';
    var PhpApiRoot = 'timesheet.symfony.local/api/';
}
else {
    var PhpRoot = 'timeinfo.com.pl/';
    var PhpApiRoot = 'timeinfo.com.pl/api/';
}

export const ROOT = window.location.protocol + "//" + PhpRoot;
export const API_ROOT = window.location.protocol + "//" + PhpApiRoot;
