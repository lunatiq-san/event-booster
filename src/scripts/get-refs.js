export default function getRefs() {
  return {
    eventsList: document.querySelector('.js-events-list'),
    paginationContainer: document.getElementById('pagination'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxContent: document.querySelector('.lightbox__content'),
    closeLightboxBtn: document.querySelector('[data-action="close-lightbox"]'),
    searchQuery: document.querySelector('.search-input'),
    lightboxBackdrop: document.querySelector('section.js-lightbox'),
    eventCard: document.querySelector('.event-card'),
    moreEventsBtn: document.querySelector('[data-action="more-events"]'),
    searchCountry: document.querySelector('.js-select2'),
    linkGeolocation: document.querySelector('.location'),
    modalMap: document.querySelector('.js-modal-map'),
    mapContent: document.querySelector('.mapid'),
    closeMapModal: document.querySelector('.map-close')
  };
}
