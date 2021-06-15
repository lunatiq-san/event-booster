const KEY = 'Xy0VDFihRxcZE0J3kNsMVc7AsbVJVwmN';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchEventsDefault() {
    const url = `${BASE_URL}/events.json?keyword=${'Dallas'}&apikey=${KEY}&size=21&page=1`;
    return fetch(url)
      .then(response => response.json())
      .then(({ _embedded }) => {
        return _embedded;
      })
      .then(({ events }) => {
        return events;
      });
  }
}

const moreBtn = new ApiService();
console.log(moreBtn.fetchEventsDefault());
// Получить данные с модалки

// по кнопке делать запрос на основании данных с карточки

// вывести релевантные поиску карточки на основной экран
