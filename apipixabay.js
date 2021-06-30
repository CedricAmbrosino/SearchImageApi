const API_KEY = '22290067-c657658609afb08eb8ddf5d2d';
const URL = `https://pixabay.com/api/?key=${API_KEY}`;
const images = document.querySelector('.containerImages');
const form =document.querySelector('form');
const inputKeysWords =document.querySelector('input[type="text"]');
const inputSelect =document.querySelector('select');

const urlMaker = (q) => {
    let lang='';
    switch (inputSelect.value) {
        case 'french':
            lang='fr';
        break;
        case 'english':
            lang='en';
        break;
        case 'spanish':
            lang='es';
        break;
        case 'italian':
            lang='it';
        break;
        default:
            lang='error';
        break;
    }
    if(lang==='error'){
        return null;
    }
    q = q.toLowerCase().replace(' ','+');
    let urlConstructor = `${URL}&q=${q}&lang=${lang}&orientation=horizontal`;
    return urlConstructor;
}

const contactApi = (q) => {
    const URLSEND = urlMaker(q);    
    if(URLSEND != null){
        images.innerHTML="";
        try{
            fetch(URLSEND).then((dataImg) => dataImg.json()).then((valueDataImg) => {
                for(let i =0; i<valueDataImg.hits.length; i++){
                    images.innerHTML += `<img height="300px" src="${valueDataImg.hits[i].webformatURL}">`;
                }
            });
        }catch(error){
            console.log(error);
        }        
    }    
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
    contactApi(inputKeysWords.value);
});

	