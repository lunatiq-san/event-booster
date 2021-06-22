import apiService from './apiService';
import getRefs from './get-refs';
import debounce from 'lodash.debounce';
import eventsTpl from '../templates/events.hbs';
import Swal from 'sweetalert2';

const refs = getRefs();

// const apiService = new NewApiService();

refs.searchQuery.addEventListener('input', debounce(onSearch, 1000));

function onSearch(e) {
    e.preventDefault();
    console.log('before', apiService);
    apiService.query = e.target.value;
    if (apiService.query.trim() === '') {
        return resetPage();
    }
    apiService.fetchEventsDefault().then(renderEventsCard).catch(onError);
    console.log('after',apiService);
}

function onError() {
    Swal.fire('Oops...', 'Nothing was found for your query! Try again...', 'error');
}
function renderEventsCard(events) {
    const markup = eventsTpl(events);
    refs.eventsList.innerHTML = markup;
}
function resetPage() {
    apiService.fetchEventsDefault().then(renderEventsCard);
}
