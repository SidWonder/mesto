const settingsForValidation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    inputInvalidClass: 'form__input_type_invalid',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    errorClass: 'form__error_visible',
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    console.log(formElement);
    inputElement.classList.add(settingsForValidation.inputInvalidClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settingsForValidation.errorClass);
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement) {
    console.log('checkInputValidity')
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    console.log('test')
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settingsForValidation.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(settingsForValidation.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(settingsForValidation.inputSelector));
    const buttonElement = formElement.querySelector(settingsForValidation.submitButtonSelector);
    console.log('setEventListeners')
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

function enableValidation(objSet){
    const formList = Array.from(document.querySelectorAll(objSet.formSelector));
    formList.forEach((formElement)=> {
        formElement.addEventListener('submit', (evt) =>{
            evt.preventDefault()
        });
      setEventListeners(formElement);
    })
}

enableValidation(settingsForValidation);