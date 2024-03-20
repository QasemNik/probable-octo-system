const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const fetchData = async (word) => {
    try {
        const res = await fetch(`${URL} ${word}`);
        const json = await res.json(); 
        return json     
    } catch (error) {
        console.log('Error' + error);
    }
}

export { fetchData }; 