function more() {
  return fetch(
    'https://app.ticketmaster.com/discovery/v2/events.json?name=Losangeles&source=universe&apikey=6lOpp5Vggq59Gw99EgHfgH1fvYexhNFuu',
  )
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log('Request error:', error);
    });
}

console.log(more());

// Получить данные с модалки
// по кнопке делать запрос на основании данных с карточки
// вывести релевантные поиску карточки на основной экран
