import eventsTpl from '../templates/events.hbs';
import apiService from './api-service';
import getRefs from './get-refs';
import { startPagination, options } from './pagination';

const refs = getRefs();

refs.moreEventsBtn.addEventListener('click', onMoreBtnClick);

function closeLightboxOnClick() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxContent.innerHTML = ' ';
  document.body.classList.remove('is-hidden');
}

function onMoreBtnClick(e) {
  e.preventDefault();
  if (refs.lightbox.classList.contains('is-open')) {
    const eventName = document
      .querySelector('.js-author-name')
      .textContent.split(' ')
      .slice(0, 2)
      .join('%20');
    apiService.searchQuery = eventName;
    clearEventsList();
    fetchEventsByName();
    closeLightboxOnClick();
  }
}

function fetchEventsByName() {
  apiService.fetchEventsDefault().then(events => {
    renderEvent(events);
    options.totalItems = apiService.totalElements;
    startPagination();
  });
}

function renderEvent(events) {
  refs.eventsList.insertAdjacentHTML('beforeend', eventsTpl(events));
}
function clearEventsList() {
  refs.eventsList.innerHTML = '';
}
