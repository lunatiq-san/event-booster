import apiService from './api-service';
import getRefs from './get-refs';
import debounce from 'lodash.debounce';
import eventsTpl from '../templates/events.hbs';
import Swal from 'sweetalert2';
import { startPagination, options } from './pagination';

const refs = getRefs();

refs.searchQuery.addEventListener('input', debounce(onSearch, 1000));

export function onSearch(e) {
  e.preventDefault();
  apiService.query = e.target.value;
  apiService
    .fetchEventsDefault()
    .then(events => {
      renderEventsCard(events);
      options.totalItems = apiService.totalElements;
      startPagination();
    })
    .catch(onError);
}

function onError() {
  Swal.fire('Oops...', 'Nothing was found for your query! Try again...', 'error');
}
function renderEventsCard(events) {
  const markup = eventsTpl(events);
  refs.eventsList.innerHTML = markup;
}
