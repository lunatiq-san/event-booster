import NewApiService from './apiService';
import getRefs from './get-refs';

const refs = getRefs();

const apiService = new NewApiService();

refs.searchQuery.addEventListener('input', feachEventSearchForName);

function feachEventSearchForName(e) {
    const searchQuery = e.target.value;
    apiService.fetchEventsSearchQuery(searchQuery).then(r => console.log(r));
}

    
