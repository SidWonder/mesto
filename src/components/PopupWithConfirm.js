import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, {submiter}) {
        super(popupSelector);
        this._submiter = submiter;
        this._form = this._popup.querySelector('.form');
        this._submitEvtHandler = this._submitEvtHandler.bind(this);
        this._submitButton = this._form.querySelector('.form__save-button');
        this._initialValueSubmitButton = this._submitButton.textContent;

    }

    renderLoading(isLoading, initialDownloadMessage = 'Cохранение...') {
        console.log('dsds')
        if (isLoading) {
            this._submitButton.textContent = initialDownloadMessage;
        } else {
            this._submitButton.textContent = this._initialValueSubmitButton;
        }
    }

    _submitEvtHandler(evt) {
        evt.preventDefault();
        this._submiter(this._data, this._card);
        this._form.removeEventListener('submit', this._submitEvtHandler);
    }

    setEventListeners() {
        this._form.addEventListener('submit', this._submitEvtHandler);
        super.setEventListeners();
    }

    open(data, card) {
        this._data = data;
        this._card = card;
        super.open();
}
}