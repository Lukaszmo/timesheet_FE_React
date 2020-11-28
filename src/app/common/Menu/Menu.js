
const SET_ACTIVE_SUBMENU_ITEM = 'SET_ACTIVE_SUBMENU_ITEM';
const SET_MENU_OPEN = 'SET_MENU_OPEN';

//actions

export function setActiveSubMenuItem(id) {
    return {
        type: SET_ACTIVE_SUBMENU_ITEM,
        payload: {
            activeSubMenuItem: id
        }
    }
}

export function setMenuOpen(isOpen) {
    return {
        type: SET_MENU_OPEN,
        payload: {
            open: isOpen
        }
    }
}

export const setActiveSubMenuItemId = (menuItemId) => {

    return (dispatch) => {
        dispatch(setActiveSubMenuItem(menuItemId));
    };

}

export const setMenuOpenFlag = (isOpen) => {

    return (dispatch) => {
        dispatch(setMenuOpen(isOpen));
    };

}

//przeniesc do konfiguracji

export const menuItems = [
    {
        id: "HOME",
        name: "Strona główna",
        redirect: "/home",
        className: "menu-item",
        icon: 'home',
        subMenu: []
    },
    {
        id: "TIMESHEET",
        name: "Czas pracy",
        redirect: "/czas-pracy-rejestracja",
        className: "menu-item",
        icon: 'clock',
        subMenu: [
            {
                id: 'TIMESHEET_REGISTER',
                name: "Rejestracja czasu",
                redirect: "czas-pracy-rejestracja",
                icon: ''
            },
            {
                id: 'TIMESHEET_LIST',
                name: "Lista godzin",
                redirect: "czas-pracy-lista",
                icon: ''
            },
            {
                id: 'SUMMARY',
                name: "Podsumowanie",
                redirect: "podsumowanie",
                icon: ''
            },
            {
                id: 'WORK_TIME_SCHEDULE',
                name: "Grafik",
                redirect: "grafik",
                icon: ''
            }
        ]
    },
    {
        id: "VACATION",
        name: "Urlopy",
        redirect: "/urlopy-dodaj-wniosek",
        className: "menu-item",
        icon: 'travel',
        subMenu: [
            {
                id: 'VACATION_ADD',
                name: "Dodaj wniosek",
                redirect: "/urlopy-dodaj-wniosek",
                icon: ''
            },
            {
                id: 'REQUEST_LIST',
                name: "Lista wniosków",
                redirect: "/urlopy-lista-wnioskow",
                icon: ''
            },
            {
                id: 'VACATION_PLAN',
                name: "Planowanie",
                redirect: "/urlopy-planowanie",
                icon: ''
            }
        ]
    },
    {
        id: "TASK_TABLE",
        name: "Tablica zadań",
        redirect: "/tablica-zadan",
        className: "menu-item",
        icon: 'table',
        subMenu: []
    },
    {
        id: "REPORTS",
        name: "Raporty",
        redirect: "/raporty-miesieczny",
        className: "menu-item",
        icon: 'chart bar',
        subMenu: [
            {
                id: 'MONTHLY_REPORT',
                name: "Raport miesięczny",
                redirect: "/raporty-miesieczny",
                icon: ''
            },
            {
                id: 'PROJECT_REPORT',
                name: "Raport projekt",
                redirect: "/raporty-projekt",
                icon: ''
            }
        ]
    },
    {
        id: "SETTINGS",
        name: "Ustawienia",
        redirect: "/ustawienia-zmiana-hasla",
        className: "menu-item",
        icon: 'cogs',
        subMenu: [
            {
                id: 'PASSWORD_CHANGE',
                name: "Zmiana hasła",
                redirect: "ustawienia-zmiana-hasla",
                icon: ''
            }
        ]
    },
    {
        id: "ADMIN",
        name: "Panel Admina",
        redirect: "/panel-admina/dodaj-uzytkownika",
        className: "menu-item",
        icon: '',
        subMenu: [
            {
                id: 'USERS',
                name: "Dodaj użytkownika",
                redirect: "/panel-admina/dodaj-uzytkownika",
                icon: ''
            },
            {
                id: 'USER_LIST',
                name: "Lista użytkowników",
                redirect: "/panel-admina/uzytkownicy-lista",
                icon: ''
            }

        ]
    }
]





//zwraca Menu Główne aplikacji
export const setMenu = () => {

    return menuItems;
}

//zwraca subMenu w zaleznosci od elementu Menu
export const setSubMenu = (menuId) => {

    for (var i = 0; i < menuItems.length; i++) {
        if (menuItems[i].id === menuId) {
            return menuItems[i];
        }
    }
}

const initialState = {
    activeSubMenuItem: '',
    open: false
};

//reducers
export default (state = initialState, action) => {
    switch (action.type) {

        case SET_ACTIVE_SUBMENU_ITEM: {
            return { ...state, ...action.payload };
        }

        case SET_MENU_OPEN: {
            return { ...state, ...action.payload };
        }

        default:
            return state;
    }
}