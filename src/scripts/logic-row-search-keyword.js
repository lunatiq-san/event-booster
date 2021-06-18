import NewApiService from './apiService';
import getRefs from './get-refs';
import debounce from 'lodash.debounce';
import eventsTpl from '../templates/events.hbs';
import Swal from 'sweetalert2';

const refs = getRefs();

const apiService = new NewApiService();

refs.searchQuery.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    apiService.query = e.target.value;
    apiService.fetchEventsDefault().then(renderEventsCard).catch(onError);
}

function onError() {
    Swal.fire('Oops...', 'Nothing was found for your query! Try again...', 'error');
      resetInput();
      resetKeyword();
      resetPage();
}
// function feachEventSearchKeyWord() {
//     apiService.fetchEventsDefault().then(renderEventsCard).catch(console.log('qwert'));
// }

function renderEventsCard(events) {
    const markup = eventsTpl(events);
    refs.eventsList.innerHTML = markup;
}
function resetInput() {
    refs.searchQuery.value = '';
}
function resetKeyword() {
    apiService.query = "";
}
function resetPage() {
    apiService.fetchEventsDefault().then(renderEventsCard);
}
