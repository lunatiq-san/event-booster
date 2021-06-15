const KEY = 'Xy0VDFihRxcZE0J3kNsMVc7AsbVJVwmN';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.id = ' ';
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

    searchEventById() {
        console.log(this.id);
        return fetch(`${BASE_URL}/events/${this.id}.json?apikey=${KEY}`)
            .then(response => response.json())
            .then(currentEvent => {
                console.log(currentEvent);
                return currentEvent;
            });
    };

    // set id(newId) {
    //     this.id = newId;
    // }
}




