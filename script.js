const buttonSubmit = document.querySelector('#buttonSubmit');
const moviesList = [];

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
        moviesList.push(newMovie)

        console.log(moviesList)
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

buttonSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    registerItem();
})
