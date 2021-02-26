class FormValidator {
    constructor(validationElement, settingsForValidation) {
        this._formSelector = settingsForValidation.formSelector;
        this._inputSelector = settingsForValidation.inputSelector;
        this._inputInvalidClass = settingsForValidation.inputInvalidClass;
        this._submitButtonSelector = settingsForValidation.submitButtonSelector;
        this._inactiveButtonClass = settingsForValidation.inactiveButtonClass;
        this._errorClass = settingsForValidation.errorClass;
    }

    _showInputError(errorElement, input) {
        errorElement.classList.add(this._errorClass);
        input.classList.add(this._inputInvalidClass);
        errorElement.textContent = input.validationMessage;
    }

    _hideInputError(errorElement, input){
        errorElement.classList.remove(this._errorClass);
        input.classList.remove(this._inputInvalidClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(form, input){
        const errorElement = form.querySelector(`#${input.id}-error`);
        if (!input.validity.valid) {
            this._showInputError(errorElement, input);
        } else {
            this._hideInputError(errorElement, input);
        }
    }
    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState (inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    _setEventListeners(form){
        const inputList = Array.from(form.querySelectorAll(this._inputSelector));
        const buttonElement = form.querySelector(this._submitButtonSelector);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(form, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    _enableValidation(){
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((formElement)=> {
            formElement.addEventListener('submit', (evt) =>{
                evt.preventDefault()
            });
            this._setEventListeners(formElement);
        })
    }

}

export { FormValidator }
