import NewApiService from './apiService';
import getRefs from './get-refs';
import debounce from 'lodash.debounce';

const refs = getRefs();

const apiService = new NewApiService();

refs.searchQuery.addEventListener('input', debounce(feachEventSearchForName, 500));

function feachEventSearchForName(e) {
    const searchQuery = e.target.value;
    apiService.fetchEventsSearchQuery(searchQuery).then(r => console.log(r));
}

    
