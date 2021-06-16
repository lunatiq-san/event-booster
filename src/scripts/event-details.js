import getRefs from './get-refs';
import ApiService from './apiService';
import eventTpl from '../templates/event.hbs';

const refs = getRefs();
const apiService = new ApiService;

refs.eventsList.addEventListener('click', openLightboxOnClick);

function openLightboxOnClick(e) {
    apiService.id = getEventId(e);
    refs.lightbox.classList.add("is-open");
    refs.closeLightboxBtn.addEventListener('click', closeLightboxOnClick);
    window.addEventListener('keydown', onEscKeyPress);
    apiService.searchEventById()
    .then(currentEvent => renderEventCard(currentEvent));
  
}


function getEventId(e) {
    let card = e.target.closest('li');
    if (!card) return;
    return card.dataset.id;
};

function renderEventCard(currentEvent) {
    refs.lightboxContent.insertAdjacentHTML('afterbegin', eventTpl(currentEvent));
}


function closeLightboxOnClick() {
    refs.lightbox.classList.remove("is-open");
    window.removeEventListener('keydown', onEscKeyPress);
    refs.lightboxContent.innerHTML = ' ';
    
};

function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = e.code === ESC_KEY_CODE;

  if (isEscKey) {
    closeLightboxOnClick();
  }
};