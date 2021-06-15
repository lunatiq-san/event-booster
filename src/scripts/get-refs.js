export default function getRefs() {
  return {
    eventsList: document.querySelector('.js-events-list'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxContent: document.querySelector('.lightbox__content'),
    closeLightboxBtn: document.querySelector('[data-action="close-lightbox"]'),
  };
}