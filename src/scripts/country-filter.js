import getRefs from './get-refs';
import apiService from './api-service';
import countryList from '../templates/country-list.hbs';
import eventsTpl from '../templates/events.hbs'
import countries from '../templates/countries.json';
import { startPagination, options } from './pagination';

const refs = getRefs();

refs.searchCountry.insertAdjacentHTML('beforeend', countryList(countries))
refs.searchCountry.addEventListener('change', onConutrySearch);

function onConutrySearch(e) {
    e.preventDefault();
    apiService.country = e.target.value;
    fetchEventsDefault();
    
};

function fetchEventsDefault() {
    apiService.fetchEventsDefault()
        .then(events => {
            options.totalItems = apiService.totalElements;
            startPagination();
            renderEventList(events)
        }).catch(error => {
        refs.eventsList.innerHTML = `<p class="error-text">Sorry, we found no events in this country. <br> Try to find interesting events in other countries.</p>`;
  });
};

function renderEventList(events) {
    refs.eventsList.innerHTML = eventsTpl(events);
};

