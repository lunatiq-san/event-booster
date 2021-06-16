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
    const url = `${BASE_URL}/events.json?&apikey=${KEY}&size=${this.perPage}&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ _embedded }) => {
        return _embedded;
      })
      .then(({ events }) => {
        return events;
      });
  }

  searchEventById() {
    console.log(this.id);
    return fetch(`${BASE_URL}/events/${this.id}.json?apikey=${KEY}`)
      .then(response => response.json())
      .then(currentEvent => {
        console.log(currentEvent);
        return currentEvent;
      });
  }

  // set id(newId) {
  //     this.id = newId;
  // }

  setPage(page) {
    this.page = page;
  }
}
