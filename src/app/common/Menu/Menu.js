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
        id: "PAGE2",
        name: "PAGE2",
        redirect: "/page2_sub1",
        image: {},
        subMenu: [
            {
                id: 'PAGE2_SUB1',
                name: "page2_sub1",
                redirect: "page2_sub1",
                image: {}
            },
            {
                id: 'PAGE2_SUB2',
                name: "page2_sub2",
                redirect: "page2_sub2",
                image: {}
            },
            {
                id: 'PAGE2_SUB3',
                name: "page2_sub3",
                redirect: "page2_sub3",
                image: {}
            }
        ]
    }
    /* do odkomentowania
    {
        id: "TIMESHEET",
        name: "Czas pracy",
        redirect: "/timesheet/register",
        image: {},
        subMenu: [
            {
                id: 'TIMESHEET_REGISTER',
                name: "Rejestruj",
                redirect: "/timesheet/register",
                image: {}
            },
            {
                id: 'TIMESHEET_WORK_SCHEDULE',
                name: "Grafik pracy",
                redirect: "/timesheet/work-schedule",
                image: {}
            },
            {
                id: 'TIMESHEET_SUMMARY',
                name: "Podsumowanie",
                redirect: "/timesheet/summary",
                image: {}
            }
        ]
    },
    {
        id: "PAGE3",
        name: "Urlopy",
        redirect: "page3",
        image: {},
        subMenu: []
    },
    {
        id: "PAGE4",
        name: "Raporty",
        redirect: "page4",
        image: {},
        subMenu: []
    }, */
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