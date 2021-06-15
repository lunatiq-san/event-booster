import getRefs from './get-refs';
import ApiService from './apiService';
import eventTpl from '../templates/event.hbs';

const refs = getRefs();
const apiService = new ApiService;

refs.eventsList.addEventListener('click', openLightboxOnClick);

function openLightboxOnClick(e) {
  apiService.id = getEventId(e);
  refs.lightbox.classList.add("is-open");
  window.addEventListener('keydown', onEscKeyPress);
  refs.closeLightboxBtn.addEventListener('click', closeLightboxOnClick);
  refs.lightboxBackdrop.addEventListener('click', onLightboxBackdropClick);
  apiService.searchEventById()
    .then(currentEvent => renderEventCard(currentEvent));

}

function getEventId(e) {
    let card = e.target.closest('li');
    if (!card) return;
    return card.dataset.id;
};

function renderEventCard(currentEvent) {
    refs.lightboxContent.insertAdjacentHTML('beforeend', eventTpl(currentEvent));
}


function closeLightboxOnClick() {
  refs.lightbox.classList.remove("is-open");
  window.removeEventListener('keydown', onEscKeyPress);
  refs.closeLightboxBtn.removeEventListener('click', closeLightboxOnClick);
  refs.lightboxBackdrop.removeEventListener('click', onLightboxBackdropClick);
  refs.lightboxContent.innerHTML = ' ';
    
};

function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = e.code === ESC_KEY_CODE;

  if (isEscKey) {
    closeLightboxOnClick();
  }
};

function onLightboxBackdropClick(e) {
    if (e.target === e.currentTarget) {
        closeLightboxOnClick();
    };

};