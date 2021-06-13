import './sass/main.scss';

import eventsTpl from './templates/events.hbs'
import ApiService from './scripts/apiService';
import getRefs from './scripts/get-refs';


const refs = getRefs();

const apiService = new ApiService();


function fetchEventsDefault() {
    apiService.fetchEventsDefault().then(events => {
    
        renderEvent(events);
    });
}


function renderEvent(events) {
    refs.eventsList.insertAdjacentHTML('beforeend', eventsTpl(events));
}


window.addEventListener('load', fetchEventsDefault());
