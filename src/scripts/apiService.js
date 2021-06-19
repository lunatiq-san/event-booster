const KEY = 'Xy0VDFihRxcZE0J3kNsMVc7AsbVJVwmN';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 0;
    this.perPage = 20;
    this.totalElements = null;
    this.id = ' ';
    this.country = '';
  }


  async fetchEventsDefault() {
    try {
      this.perPage = onSize();
      const url = `${BASE_URL}/events.json?&keyword=${this.searchQuery}&apikey=${KEY}&size=${this.perPage}&page=${this.page}&sort=id,asc&countryCode=${this.country}`;
      const response = await fetch(url);
      const { _embedded } = await response.json();
      const { events } = _embedded;
      return events;
    } catch (err) {
      console.log(err);
      throw (err = 'Whoops, didn’t find anything. Shall we try to find something else?');
    }


    function onSize() {
      const windowInnerWidth = window.innerWidth;
      if (windowInnerWidth >= 1280 || windowInnerWidth < 768) {
        return 20;
      } else {
        return 21;
      }
    }
  }

  async searchEventById() {
    try {
      const response = await fetch(`${BASE_URL}/events/${this.id}.json?apikey=${KEY}`);
      const currentEvent = await response.json();
      return currentEvent;
    } catch (err) {
      console.log(err);
    }
  }

  fetchEventsByName(name) {
    this.perPage = onSize();
    const url = `${BASE_URL}/events.json?&keyword=${name}&apikey=${KEY}&size=${this.perPage}&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ _embedded }) => _embedded)
      .then(({ events }) => events);
  }

  setPage(page) {
    this.page = page;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

}
