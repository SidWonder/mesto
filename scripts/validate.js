const settingsForValidation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    inputInvalidClass: 'form__input_type_invalid',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    errorClass: 'form__error_visible',
};

const showInputError = (formElement, inputElement, errorMessage, settingsForValidation) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(settingsForValidation.inputInvalidClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settingsForValidation.errorClass);
};

const hideInputError = (formElement, inputElement, settingsForValidation) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(settingsForValidation.inputInvalidClass);
    errorElement.classList.remove(settingsForValidation.errorClass);
    errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, settingsForValidation) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settingsForValidation);
    } else {
        hideInputError(formElement, inputElement, settingsForValidation);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, settingsForValidation) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settingsForValidation.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(settingsForValidation.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement, settingsForValidation) => {
    const inputList = Array.from(formElement.querySelectorAll(settingsForValidation.inputSelector));
    const buttonElement = formElement.querySelector(settingsForValidation.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, settingsForValidation);
            toggleButtonState(inputList, buttonElement, settingsForValidation);
        });
    });
};

function enableValidation(settingsForValidation){
    const formList = Array.from(document.querySelectorAll(settingsForValidation.formSelector));
    formList.forEach((formElement)=> {
        formElement.addEventListener('submit', (evt) =>{
            evt.preventDefault()
        });
      setEventListeners(formElement, settingsForValidation);
    })
}

enableValidation(settingsForValidation);