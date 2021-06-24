import Pagination from 'tui-pagination';
import getRefs from './get-refs';
import eventsTpl from '../templates/events.hbs';
import apiService from './api-service';

const refs = getRefs();

export const options = {
  visiblePages: 5,
  itemsPerPage: 20,
  centerAlign: true,
  page: 1,
};

if (window.innerWidth < 768) {
  options.visiblePages = 3;
}

function fetchEvents() {
  apiService.fetchEventsDefault().then(events => {
    renderEvent(events);
  });
}

function renderEvent(events) {
  clearEventsList();
  refs.eventsList.insertAdjacentHTML('beforeend', eventsTpl(events));
}

export function startPagination() {
  const pagination = new Pagination(refs.paginationContainer, options);
  pagination._options.totalItems = apiService.totalElements;
  pagination.on('beforeMove', ({ page }) => {
    apiService.setPage(page - 1);

    fetchEvents();
    scrollToTop();
  });
}

function clearEventsList() {
  refs.eventsList.innerHTML = '';
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
