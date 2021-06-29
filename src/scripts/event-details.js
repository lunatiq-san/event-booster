import getRefs from './get-refs';
import apiService from './api-service';
import eventTpl from '../templates/event.hbs';

const ESC_KEY_CODE = 'Escape';
const refs = getRefs();

refs.eventsList.addEventListener('click', openLightboxOnClick);

function openLightboxOnClick(e) {
  let card = e.target.closest('.img-trumb');
  if (!card) return;

  renderEventCard(card);
  refs.lightbox.classList.add('is-open');
  document.body.classList.add('is-hidden');
  addEventListeners();
}

function renderEventCard(card) {
  apiService.id = card.parentNode.dataset.id;
  apiService
    .searchEventById()
    .then(currentEvent => {
      if (currentEvent.dates.start.localTime) {
        currentEvent.dates.start.localTime = currentEvent.dates.start.localTime.slice(0, -3);
      }
      refs.lightboxContent.insertAdjacentHTML('afterbegin', eventTpl(currentEvent));
    })
    .catch(error => console.log(error));
}

function closeLightboxOnClick() {
  refs.lightbox.classList.remove('is-open');
  document.body.classList.remove('is-hidden');
  removeEventListeners();
  refs.lightboxContent.innerHTML = ' ';
}

function closeLightboxOnEscKeyPress(e) {
  const isEscKey = e.code === ESC_KEY_CODE;
  if (isEscKey) {
    closeLightboxOnClick();
  }
}

function onLightboxBackdropClick(e) {
  if (e.target === e.currentTarget) {
    closeLightboxOnClick();
  }
}

function addEventListeners() {
  window.addEventListener('keydown', closeLightboxOnEscKeyPress);
  refs.closeLightboxBtn.addEventListener('click', closeLightboxOnClick);
  refs.lightboxBackdrop.addEventListener('click', onLightboxBackdropClick);
}

function removeEventListeners() {
  window.removeEventListener('keydown', closeLightboxOnEscKeyPress);
  refs.closeLightboxBtn.removeEventListener('click', closeLightboxOnClick);
  refs.lightboxBackdrop.removeEventListener('click', onLightboxBackdropClick);
}
