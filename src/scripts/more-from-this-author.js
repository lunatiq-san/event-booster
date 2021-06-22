import eventsTpl from '../templates/events.hbs';
import apiService from './apiService';
import getRefs from './get-refs';
import { startPagination, options } from './pagination2';

const refs = getRefs();
// const apiService = new ApiService();

function closeLightboxOnClick() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxContent.innerHTML = ' ';
  document.body.classList.remove('is-hidden');
}

refs.moreEventsBtn.addEventListener('click', onMoreBtnClick);

function onMoreBtnClick(e) {
  e.preventDefault();
  if (refs.lightbox.classList.contains('is-open')) {
    const eventName = document
      .querySelector('.js-author-name')
      .textContent.split(' ')
      .slice(0, 2)
      .join('%20');
    // console.log(eventName);
    apiService.searchQuery = eventName;
    clearEventsList();
    // fetchEventsByName(eventName);
    fetchEventsByName();
    closeLightboxOnClick();
  }
}

// function fetchEventsByName(name) {
//   apiService.fetchEventsByName(name).then(events => {
//     renderEvent(events);

//   });
// }

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
// Получить данные с модалки

// по кнопке делать запрос на основании данных с карточки

// вывести релевантные поиску карточки на основной экран

// function startPagination() {
//   const pagination = new Pagination(refs.paginationContainer, options);

//   pagination.on('beforeMove', ({ page }) => {
//     apiService.setPage(page);
//     console.log(page);

//     fetchEvents();
//   });
// }

// startPagination();
