const KEY = 'Xy0VDFihRxcZE0J3kNsMVc7AsbVJVwmN';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export default class ApiService {
    constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 20;
    this.totalElements = null;
    this.id = ' ';
    }

    fetchEventsDefault() {
        const size = onSize();
        const url = `${BASE_URL}/events.json?&apikey=${KEY}&size=${size}&page=${this.page}&sort=id,asc&keyword=${this.searchQuery}`;
        return fetch(url)
        .then(response => response.json())
        .then(({ _embedded }) => {
            return _embedded;
        })
        .then(({ events }) => {
            return events;
        });
            
      function onSize() {
        const windowInnerWidth = window.innerWidth
            if (windowInnerWidth >= 1280 || windowInnerWidth < 768) {
            return 20;
        } else {
                return 21;
            }
        }
    };


    async searchEventById() {
        try {
            const response = await fetch(`${BASE_URL}/events/${this.id}.json?apikey=${KEY}`);
            const currentEvent = await response.json();
            return currentEvent;
        } catch (err) {
            console.log(err)
        };
    };
        

  fetchEventsByName(name) {
    const url = `${BASE_URL}/events.json?&keyword=${name}&apikey=${KEY}&size=${this.perPage}&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ _embedded }) => {
        return _embedded;
      })
      .then(({ events }) => {
        return events;
      });
  }



  setPage(page) {
    this.page = page;
  }

}




