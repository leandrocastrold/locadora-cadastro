const buttonSubmit = document.querySelector('#buttonSubmit');
const buttonView = document.querySelector('#buttonView');
const popup = document.querySelector('.popup-wrapper');
const closePopupButton = document.querySelector('.popup-close');
const viewPanelInfo = document.querySelector('#moviesInfo');

let moviesList = [];

const registerItem = () => {

    const inputName = document.querySelector('#movieName');
    const inputDesc = document.querySelector('#movieDesc');
    const selectGender = document.querySelector('#selectGender');
    const selectAge = document.querySelector('#selectAge');
    const inputQuantity = document.querySelector('#movieQuantity');
    const inputDate = document.querySelector('#movieDate');


    const inputsToValidate = [
        inputName.value.trim(),
        inputDesc.value.trim(),
    ];

    if (validateData(inputsToValidate)) {
        const newMovie = {
            name: inputName.value,
            description: inputDesc.value,
            gender: selectGender.value,
            age: selectAge.value,
            quantity: inputQuantity.value,
            date: inputDate.value
        };
      
        loadSavedMovies();
        insertNewMovieintoList(newMovie)
        saveMoviesList(moviesList);
      
    }

}

const validateData = (inputsArray) => {

    if (!/\S/.test(inputsArray[0])) {
        alert("Por favor, preencha o campo nome");
        return false;

    } else if (!/\S/.test(inputsArray[1])) {
        alert("Por favor, adicione uma descrição ao filme")
        return false;
    }
    return true;
}

const loadSavedMovies = () => {
    let list = localStorage.getItem('movies-saved')
    
    if (list == undefined || list == null ) {
        list = [];
    } else {
        list = JSON.parse(list);
      
    }
    viewPanelInfo.innerHTML  = `Filmes Cadastrados: ${list.length}`
    console.log(list.length)
}

const insertNewMovieintoList = () => {

}

const saveMovieList = () => {

}




const viewMovieList = () => {
    popup.style.display = 'block'
}


buttonSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    registerItem();
})

buttonView.addEventListener('click', () => {
    viewMovieList();

})

popup.addEventListener('click', event => {
    const currentClassName = event.target.className;
    const classNames = ['popup-wrapper', 'popup-close']
    const shouldClosePopup = classNames.some(name => name === currentClassName);

    if (shouldClosePopup) {
        popup.style.display = "none"
    }
})

loadSavedMovies();
