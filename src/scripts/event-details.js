import getRefs from './get-refs';
import ApiService from './apiService';
import eventTpl from '../templates/event.hbs';

const refs = getRefs();
const apiService = new ApiService;

refs.eventsList.addEventListener('click', openLightboxOnClick);

function openLightboxOnClick(e) {
  let card = e.target.closest('li');
  if (!card) return;
  renderEventCard(card);
  refs.lightbox.classList.add("is-open");
  document.body.classList.add("is-hidden");
  addEventListeners();
  
};

function renderEventCard(card) {
  apiService.id = card.dataset.id;
  apiService.searchEventById()
    .then(findBestImg)
    .then(currentEvent => {
      if (currentEvent.dates.start.localTime) {
        currentEvent.dates.start.localTime = currentEvent.dates.start.localTime.slice(0, -3);
      };
      refs.lightboxContent.insertAdjacentHTML('afterbegin', eventTpl(currentEvent));
    })
    .catch(error => console.log(error));
};

function closeLightboxOnClick() {
  refs.lightbox.classList.remove("is-open");
  document.body.classList.remove("is-hidden")
  removeEventListeners();
  refs.lightboxContent.innerHTML = ' ';
    
};

function closeLightboxOnEscKeyPress(e) {
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

function addEventListeners() {
   window.addEventListener('keydown', closeLightboxOnEscKeyPress);
  refs.closeLightboxBtn.addEventListener('click', closeLightboxOnClick);
  refs.lightboxBackdrop.addEventListener('click', onLightboxBackdropClick);
};

function removeEventListeners() {
  window.removeEventListener('keydown', closeLightboxOnEscKeyPress);
  refs.closeLightboxBtn.removeEventListener('click', closeLightboxOnClick);
  refs.lightboxBackdrop.removeEventListener('click', onLightboxBackdropClick);
};

function findBestImg(event) {
  const properImgWidth = 640;
  const properImgHeight = 427;
  event.imageUrl = event.images.filter(image => image.width === properImgWidth && image.height === properImgHeight)[0].url;
  return event
};



// refs.eventsList.addEventListener('keydown', openLightboxOnEnterKeydown);

// function openLightboxOnEnterKeydown(e) {
//   console.log(e.code);
//   console.log(e.target.classList.contains('event-card'));
//   if (e.code === 'Enter' && e.target.classList.contains('event-card')) {
//     openLightboxOnClick(e);
//   }
// }
