import eventsTpl from '../templates/events.hbs'
import apiService from './apiService';
import getRefs from './get-refs';
import {startPagination, options} from './pagination2'


const refs = getRefs();

// const apiService = new ApiService();

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


window.addEventListener('load', fetchEventsDefault);
