import eventsTpl from '../templates/events.hbs'
import apiService from './apiService';
import getRefs from './get-refs';
import {startPagination, options} from './pagination2'


const refs = getRefs();
const PROPER_IMG_WIDTH = 640;
const PROPER_IMG_HEIGHT = 427;

// const apiService = new ApiService();

function fetchEventsDefault() {
    apiService.fetchEventsDefault()
        .then(findBestImgs)
        .then(events => {
        renderEvent(events);
        options.totalItems = apiService.totalElements;
        startPagination();
    });
}


function renderEvent(events) {
    refs.eventsList.insertAdjacentHTML('beforeend', eventsTpl(events));
}


window.addEventListener('load', fetchEventsDefault);

function findBestImgs(events) {
    events.map(event => event.imageUrl = event.images.filter(image => image.width === PROPER_IMG_WIDTH && image.height === PROPER_IMG_HEIGHT)[0].url);
    return events;

};


