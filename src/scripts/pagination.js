import Pagination from 'tui-pagination';
import getRefs from './get-refs';
import eventsTpl from '../templates/events.hbs';
import ApiService from './apiService';

const refs = getRefs();

const apiService = new ApiService();

const options = {
  totalItems: 980,
  visiblePages: 5,
  itemsPerPage: 20,
  centerAlign: true,
  page: 1,
  // template: {
  //   moveButton: '',
  // },
};

function fetchEvents() {
  apiService.fetchEventsDefault().then(events => {
    renderEvent(events);
  });
}

function renderEvent(events) {
  clearEventsList();
  refs.eventsList.insertAdjacentHTML('beforeend', eventsTpl(events));
}

function startPagination() {
  const pagination = new Pagination(refs.paginationContainer, options);

  pagination.on('beforeMove', ({ page }) => {
    apiService.setPage(page);
    console.log(page);

    fetchEvents();
  });
}

function clearEventsList() {
  refs.eventsList.innerHTML = '';
}

startPagination();
