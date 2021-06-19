import getRefs from './get-refs';
import ApiService from './apiService';

const refs = getRefs();
const apiService = new ApiService;
apiService.countryList = renderCountryList();
console.log(apiService.countryList);

async function renderCountryList() {
    const finalCountryList = [];
    const finalCountryList2 = [];


// a)
    // return await apiService.fetchEventsDefault()
    //     .then(events => {
    //     const countryList = events.map(event => event._embedded.venues[0].country);
    //         console.log(countryList);
   
    //         const uniqCountryList = removeDuplicateObjects(countryList);
            
    //         console.log(uniqCountryList);
    //         finalCountryList.push(...uniqCountryList);
    //         console.log(finalCountryList);
    //         return finalCountryList;
    //     });
  
    // b)
    apiService.getCountryList()
        .then(events => {
            // console.log(events);

            console.log(apiService.totalPages);
            const countryList = events.map(event => event._embedded.venues[0].country);
            // console.log(countryList);
   
            const uniqCountryList = removeDuplicateObjects(countryList);
            
            // console.log(uniqCountryList);
            finalCountryList.push(...uniqCountryList);

            for (let i = 1; i < 6; i += 1) {
                apiService.incrementPage();
                console.log(apiService.page);

                apiService.getCountryList().then(events => {
                    // console.log(events);
        
                    console.log(apiService.page);
                    console.log(apiService.totalPages);
                    const countryList = events.map(event => event._embedded.venues[0].country);
                    // console.log(countryList);
   
                    const uniqCountryList = removeDuplicateObjects(countryList);
            
                    console.log(uniqCountryList);
                    finalCountryList.push(...uniqCountryList);
                
                });
            };
            console.log(finalCountryList);
            return finalCountryList;


    
        }).then(list => {
            const filtredList = removeDuplicateObjects(list);
            finalCountryList2.push(...filtredList);
            // finalCountryList2.push(...removeDuplicateObjects(list))
            
            console.log(list)
            console.log(filtredList);
            console.log(finalCountryList2);
        });
    console.log(finalCountryList2);

    return finalCountryList2;

    
};
    


function removeDuplicateObjects(array) {
  return [...new Set(array.map(s => JSON.stringify(s)))]
    .map(s => JSON.parse(s));
}


// const file = [
//     { name: "United States Of America", countryCode: "US" },
//     { name: "Canada", countryCode: "CA" },
//     { name: "United States Of America", countryCode: "US" },
//     { name: "Great Britain", countryCode: "GB" },
//     { name: "United States Of America", countryCode: "US" },
//     { name: "Great Britain", countryCode: "GB" },
// ];
// const newFiile = [];
// newFiile.push(...removeDuplicateObjects(file));
// console.log(newFiile);