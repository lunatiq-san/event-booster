import eventsTpl from '../templates/events.hbs';
import apiService from './api-service';
import getRefs from './get-refs';
import { startPagination, options } from './pagination';

const refs = getRefs();

window.addEventListener('load', fetchEventsDefault);

function fetchEventsDefault() {
  apiService.fetchEventsDefault().then(events => {
    renderEvent(events);
    options.totalItems = apiService.totalElements;
    startPagination();
  });
}

function renderEvent(events) {
  refs.eventsList.insertAdjacentHTML('beforeend', eventsTpl(events));
}
