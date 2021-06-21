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
};

if (window.innerWidth < 768) {
  options.visiblePages = 3;
}

startPagination();

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
