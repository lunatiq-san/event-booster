const KEY = 'Xy0VDFihRxcZE0J3kNsMVc7AsbVJVwmN';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchEventsDefault() {
        const windowInnerWidth = window.innerWidth
        const size = onSize();
        
        const url = `${BASE_URL}/events.json?&apikey=${KEY}&size=${size}&page=1`;
        return fetch(url)
        .then(response => response.json())
        .then(({ _embedded }) => {
            return _embedded;
        })
        .then(({ events }) => {
            return events;
        });

        function onSize() {
            if (windowInnerWidth >= 1280 || windowInnerWidth < 768) {
            return 20;
        } else {
                return 21;
            }
        }
    };

    // fetchEventsDefault() {
    //     const url = `${BASE_URL}/events.json?&apikey=${KEY}&size=${this.size}&page=1`;
    //     return fetch(url)
    //         .then(response => response.json())
    //         .then(({ _embedded }) => {
    //             return _embedded;
    //         })
    //         .then(({ events }) => {
    //             return events;
    //         });
    // };
    // onSize() {
    //     const windowInnerWidth = window.innerWidth
    //     console.log(windowInnerWidth);
    //     if (windowInnerWidth >= 1280 || windowInnerWidth < 768) {
    //          this.size = 20;
    //         return this.size;
    //     } else {
    //          this.size = 21;
    //         return this.size;
    //     }
    //     // return this.size;
    // };

    };