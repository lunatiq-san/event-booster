import getRefs from './get-refs';
import apiService from './apiService';
import countryList from '../templates/country-list.hbs';
import eventsTpl from '../templates/events.hbs'
import countries from '../templates/countries.json';
import { startPagination, options } from './pagination2';

const refs = getRefs();


refs.searchCountry.insertAdjacentHTML('beforeend', countryList(countries))
refs.searchCountry.addEventListener('change', onConutrySearch);

function onConutrySearch(e) {
    e.preventDefault();
    apiService.country = e.target.value;
    
    fetchEventsDefault();
    
}

function fetchEventsDefault() {
    apiService.fetchEventsDefault()
        .then(events => {
            options.totalItems = apiService.totalElements;
            startPagination();

            renderEventList(events)
        }).catch(error => {
        refs.eventsList.innerHTML = `<p class="error-text">Sorry, we found no events in this country. <br> Try to find interesting events in other countries.</p>`;
  });
}


function renderEventList(events) {
    refs.eventsList.innerHTML = eventsTpl(events);
}


//  добавить в indexedDB.html
// {/* <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
// <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script> */}

// <link rel="stylesheet" href="/select2/dist/css/select2.min.css">
// <script src="/jquery.min.js"></script>
// <script src="/select2/dist/js/select2.min.js"></script>
// <scrip src="/select2/dist/js/i18n/ru.js"></script>

// $(document).ready(function() {
// 	$('.js-select2').select2({
// 		placeholder: "Choose country",
// 		maximumSelectionLength: 2,
// 		language: "en"
// 	});
// });
