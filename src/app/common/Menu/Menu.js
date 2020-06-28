//przeniesc do konfiguracji
export const menuItems = [
    {
        id: "HOME",
        name: "Strona główna",
        redirect: "/home",
        image: {},
        subMenu: [
            {
                id: 'HOME_SUB1',
                name: "sub1",
                redirect: "home_sub1",
                image: {}
            },
            {
                id: 'HOME_SUB2',
                name: "sub2",
                redirect: "home_sub2",
                image: {}
            },
            {
                id: 'HOME_SUB3',
                name: "sub3",
                redirect: "home_sub3",
                image: {}
            }
        ]
    },
    {
        id: "TIMESHEET",
        name: "Czas pracy",
        redirect: "/czas-pracy-rejestracja",
        image: {},
        subMenu: [
            {
                id: 'TIMESHEET_SUB',
                name: "Rejestracja czasu",
                redirect: "czas-pracy-rejestracja",
                image: {}
            },
            {
                id: 'TIMESHEET_LIST',
                name: "Lista godzin",
                redirect: "czas-pracy-lista",
                image: {}
            },
            {
                id: 'WORK_TIME_SCHEDULE',
                name: "Grafik",
                redirect: "grafik",
                image: {}
            },
            {
                id: 'SUMMARY',
                name: "Podsumowanie",
                redirect: "podsumowanie",
                image: {}
            }
        ]
    },
    {
        id: "VACATION",
        name: "Urlopy",
        redirect: "/urlopy-dodaj-wniosek",
        image: {},
        subMenu: [
            {
                id: 'VACATION_ADD',
                name: "Dodaj wniosek",
                redirect: "/urlopy-dodaj-wniosek",
                image: {}
            },
            {
                id: 'REQUEST_LIST',
                name: "Lista wniosków",
                redirect: "/urlopy-lista-wnioskow",
                image: {}
            },
            {
                id: 'VACATION_PLAN',
                name: "Planowanie",
                redirect: "/urlopy-planowanie",
                image: {}
            }
        ]
    },
    {
        id: "REPORTS",
        name: "Raporty",
        redirect: "/raporty",
        image: {},
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