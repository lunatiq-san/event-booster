export default function getRefs() {
  return {
    eventsList: document.querySelector('.js-events-list'),
    paginationContainer: document.getElementById('pagination'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxContent: document.querySelector('.lightbox__content'),
    closeLightboxBtn: document.querySelector('[data-action="close-lightbox"]'),
    eventCard: document.querySelector('.event-card'),
  };
}
