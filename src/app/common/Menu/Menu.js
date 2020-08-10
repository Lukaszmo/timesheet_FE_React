
const SET_ACTIVE_MENU_ITEM = 'SET_ACTIVE_MENU_ITEM';

//actions
export function setActiveMenuItem(id) {
    return {
        type: SET_ACTIVE_MENU_ITEM,
        payload: {
            activeMenuItem: id
        }
    }
}

export const setActiveMenuItemId = (menuItemId) => {

    return (dispatch) => {
        dispatch(setActiveMenuItem(menuItemId));
    };

}

//przeniesc do konfiguracji
export const menuItems = [
    {
        id: "HOME",
        name: "Strona główna",
        redirect: "/home",
        icon: 'home',
        subMenu: [
            {
                id: 'HOME_SUB1',
                name: "sub1",
                redirect: "home_sub1",
                icon: ''
            },
            {
                id: 'HOME_SUB2',
                name: "sub2",
                redirect: "home_sub2",
                icon: ''
            },
            {
                id: 'HOME_SUB3',
                name: "sub3",
                redirect: "home_sub3",
                icon: ''
            }
        ]
    },
    {
        id: "TIMESHEET",
        name: "Czas pracy",
        redirect: "/czas-pracy-rejestracja",
        icon: 'clock',
        subMenu: [
            {
                id: 'TIMESHEET_SUB',
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
                id: 'WORK_TIME_SCHEDULE',
                name: "Grafik",
                redirect: "grafik",
                icon: ''
            },
            {
                id: 'SUMMARY',
                name: "Podsumowanie",
                redirect: "podsumowanie",
                icon: ''
            }
        ]
    },
    {
        id: "VACATION",
        name: "Urlopy",
        redirect: "/urlopy-dodaj-wniosek",
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
        icon: 'table',
        subMenu: []
    },
    {
        id: "REPORTS",
        name: "Raporty",
        redirect: "/raporty",
        icon: 'chart bar',
        subMenu: []
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
    activeMenuItem: 'HOME'
};

//reducers
export default (state = initialState, action) => {
    switch (action.type) {

        case SET_ACTIVE_MENU_ITEM: {
            return { ...state, ...action.payload };
        }


        default:
            return state;
    }
}