import NewApiService from './apiService';
import getRefs from './get-refs';
import debounce from 'lodash.debounce';
import eventsTpl from '../templates/events.hbs'

const refs = getRefs();

const apiService = new NewApiService();

refs.searchQuery.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    apiService.query = e.target.value;
    feachEventSearchKeyWord();
}

function feachEventSearchKeyWord() {
    apiService.fetchEventsSearchQuery().then(renderEventsCard);
}

function renderEventsCard(events) {
    const markup = eventsTpl(events);
    refs.eventsList.innerHTML = markup;
}
    
