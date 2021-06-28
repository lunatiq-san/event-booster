import getRefs from './get-refs';
import apiService from './api-service';


const refs = getRefs();

refs.eventsList.addEventListener('click', clickOnLocation);
function clickOnLocation (event){
  event.preventDefault();
  let location = event.target.classList.contains('location');
  let locationId = event.target;
  if(!location){
    return;
  }
  
  renderMap(locationId);
  refs.modalMap.classList.add('is-open');
  document.body.classList.add('is-hidden');
  addEventListener();
  initializingMap();
};

function renderMap(locationId) {
	apiService.id = locationId.id;
	apiService
	  .searchEventByMap()
	  .then(geolocation => {
		  const data = {
			latitude: geolocation.location.latitude,
			longitude: geolocation.location.longitude,
			namePlace: geolocation.name,
			address: geolocation.address.line1,
			city: geolocation.city.name,
			country: geolocation.country.name,
			url: geolocation.url 
		  }
		  
		buildMap(data);
		return 
	  })
	  .catch(error => console.log(error));
  }


function buildMap(data){
	const mymap = L.map('mapid').setView([data.latitude, data.longitude], 13);
	console.log(mymap);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);

	L.marker([data.latitude, data.longitude]).addTo(mymap)
		.bindPopup(`Name: ${data.namePlace},</br> Address: ${data.address},</br> City: ${data.city},</br>
		Country: ${data.country},</br> Ticket: <a href="${data.url}" target="_blank">buy</a> `).openPopup();
}

function initializingMap() {
var container = L.DomUtil.get('mapid'); 
if(container != null){ 
	container._leaflet_id = null;
}}

//События
function closeModalMapOnClick(){
	refs.modalMap.classList.remove('is-open');
	document.body.classList.remove('is-hidden');
	removeEventListener();
	initializingMap();
}

function closeModalMapOnEscKey(e){
	const isEscKey = e.code ===ESC_KEY_CODE;
	if(isEscKey){
		closeModalMapOnClick();
	}
}

function onModalMapBackdropClick(e){
if (e.target === e.currentTarget){
	closeModalMapOnClick();
}
}

function addEventListener(){
	window.addEventListener('keydown', closeModalMapOnEscKey);
	refs.closeMapModal.addEventListener('click', closeModalMapOnClick);
	refs.modalMap.addEventListener('click', onModalMapBackdropClick);
}

function removeEventListener() {
	window.removeEventListener('keydown', closeModalMapOnEscKey);
	refs.closeMapModal.removeEventListener('click', closeModalMapOnClick);
	refs.modalMap.removeEventListener('click', onModalMapBackdropClick);
}
