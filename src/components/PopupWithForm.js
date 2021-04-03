import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, {submiter}) {
        super(popupSelector);
        this._submiter = submiter;
        this._form = this._popup.querySelector('.form');
        this._submitButton = this._form.querySelector('.form__button');
        this._initialValueSubmitButton = this._submitButton.textContent;
        this._submitEvtHandler = this._submitEvtHandler.bind(this);
        this.renderLoading = this.renderLoading.bind(this)
    }
    _submitEvtHandler(evt) {
        evt.preventDefault();
        this._submiter(this._getInputValues());
    }


    renderLoading(isLoading, initialDownloadMessage = 'Cохранение...') {
        if (isLoading) {
            this._submitButton.textContent = initialDownloadMessage;
        } else {
            this._submitButton.textContent = this._initialValueSubmitButton;
        }
    }
    _getInputValues() {
        const inputsList = Array.from(this._form.querySelectorAll('.form__input'));
        const data = {};

        inputsList.forEach(input => {
            data[input.name] = input.value;
        })
        return data;
    };

    close() {
        this._form.reset();
        this._form.removeEventListener('submit', this._submitEvtHandler);
        super.close();
    }

    setEventListeners() {
        this._form.addEventListener('submit', this._submitEvtHandler);
        super.setEventListeners();
    }
}