import eventsTpl from '../templates/events.hbs'
import ApiService from './apiService';
import getRefs from './get-refs';


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
