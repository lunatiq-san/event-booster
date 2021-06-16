import eventsTpl from '../templates/events.hbs';
import ApiService from './apiService';
import getRefs from './get-refs';
import Pagination from 'tui-pagination';

const refs = getRefs();
const apiService = new ApiService();

refs.lightbox.addEventListener('click', onMoreBtnClick);

function closeLightboxOnClick() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxContent.innerHTML = ' ';
}

function onMoreBtnClick() {
  setTimeout(() => {
    if (refs.lightbox.classList.contains('is-open')) {
      const eventName = document
        .querySelector('.name')
        .textContent.split(' ')
        .slice(0, 2)
        .join('%20');

      // console.log(eventName.split(' ').slice(0, 2).join('%20'));
      clearEventsList();
      fetchEventsByName(eventName);
      const moreEventsBtn = document.querySelector('.card').lastElementChild;
      moreEventsBtn.addEventListener('click', closeLightboxOnClick);
    }
  }, 500);
}

function fetchEventsByName(name) {
  apiService.fetchEventsByName(name).then(events => {
    renderEvent(events);
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
