const buttonSubmit = document.querySelector('#buttonSubmit');
const buttonView = document.querySelector('#buttonView');
const buttonDelete = document.querySelector('#buttonDelete');

const selectCategory = document.querySelector('#selectGen');

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

    moviesList = localStorage.getItem('movies-saved')

    if (moviesList == undefined || moviesList == null) {
        moviesList = [];
    } else {
        moviesList = JSON.parse(moviesList);

    }
    viewPanelInfo.innerHTML = `Filmes Cadastrados: ${moviesList.length}`
    console.log(moviesList)
}

const insertNewMovieintoList = (movie) => {

    moviesList.push(movie);
}

const saveMoviesList = (list) => {

    localStorage.setItem('movies-saved', JSON.stringify(list));
    alert('Cadastro realizado com sucesso');
}

const viewMovieList = () => {
    popup.style.display = 'block'
}

const fillListOfMovies = (filteredList) => {
    const moviesTable = document.querySelector('#tbMovies');

    if (filteredList.length > 0) {
        moviesTable.innerHTML = '';
        filteredList.forEach(item => {
            moviesTable.innerHTML += `<tr>
                                <td>${item.name}</td>
                                <td>${item.description}</td>
                                <td>${item.gender}</td>
                                <td>${item.age}</td>
                                <td>${item.quantity}</td>
                                <td>${item.date}</td>
                                </tr>`
        })
        
    } else {
        console.log('Lista Vazia');
        moviesTable.innerHTML = "Sem filmes cadastrados";

    }

}

const filterMoviesByCategory = () => {

    let filteredMovieList = [];

    if (selectCategory.value !== "Todos") {
        filteredMovieList = moviesList.filter(({ gender }) => gender === selectCategory.value);
    } else {
        filteredMovieList = moviesList;
    }
    return filteredMovieList
}

selectCategory.addEventListener('change', () => {
    console.log('hange');
    fillListOfMovies(filterMoviesByCategory())
})

buttonSubmit.addEventListener("click", (event) => {
    // event.preventDefault();
    registerItem();
});

buttonView.addEventListener('click', () => {
    fillListOfMovies(moviesList);
    viewMovieList();
});

buttonDelete.addEventListener('click', () => {

    if (confirm("Quer realmente apagar os dados salvos?")) {
        alert('Os filmes salvos foram apagados!')
        localStorage.clear();
    }
});

popup.addEventListener('click', event => {
    const currentClassName = event.target.className;
    const classNames = ['popup-wrapper', 'popup-close']
    const shouldClosePopup = classNames.some(name => name === currentClassName);

    if (shouldClosePopup) {
        popup.style.display = "none"
    }
})

loadSavedMovies();