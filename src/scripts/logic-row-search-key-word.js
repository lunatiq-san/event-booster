import NewApiService from './apiService';
import getRefs from './get-refs';
import debounce from 'lodash.debounce';

const refs = getRefs();

const apiService = new NewApiService();

refs.searchQuery.addEventListener('input', debounce(feachEventSearchKeyWord, 500));

function feachEventSearchKeyWord(e) {
    const searchQuery = e.target.value;
    apiService.fetchEventsSearchQuery(searchQuery).then(r => console.log(r));
}

    
