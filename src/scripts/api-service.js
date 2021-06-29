const KEY = 'Xy0VDFihRxcZE0J3kNsMVc7AsbVJVwmN';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const PROPER_IMG_WIDTH = 640;
const PROPER_IMG_HEIGHT = 427;

class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 0;
    this.perPage = 20;
    this.totalElements = 0;
    this.id = ' ';
    this.country = '';
  }

  async fetchEventsDefault() {
    try {
      this.perPage = onSize();

      const url = `${BASE_URL}/events.json?&keyword=${this.searchQuery}&apikey=${KEY}&size=${this.perPage}&page=${this.page}&sort=id,asc&countryCode=${this.country}`;
      const response = await fetch(url);
      const { _embedded, page } = await response.json();

      this.totalPages = page.totalPages;
      this.totalElements = page.totalElements;

      const { events } = _embedded;

      this.findBestImgs(events);

      return events;
    } catch (err) {
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

      this.findBestImg(currentEvent);

      return currentEvent;
    } catch (err) {
      console.log(err);
    }
  }

  async searchEventByMap() {
    try {
      const response = await fetch(`${BASE_URL}/events/${this.id}.json?apikey=${KEY}`);
      const currentEvent = await response.json();
      const geolocation = currentEvent._embedded.venues[0]
      return geolocation;
    } catch (err) {
      console.log(err);
    }
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

  findBestImgs(events) {
    events.map(this.findBestImg);
    return events;
  }

  findBestImg(event) {
    event.imageUrl = event.images.filter(
      image => image.width === PROPER_IMG_WIDTH && image.height === PROPER_IMG_HEIGHT,
    )[0].url;
    return event;
  }
}

const apiService = new ApiService();
export default apiService;
