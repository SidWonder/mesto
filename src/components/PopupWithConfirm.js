import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, {submiter}) {
        super(popupSelector);
        this._submiter = submiter;
        this._form = this._popup.querySelector('.form');
        this._submitEvtHandler = this._submitEvtHandler.bind(this);

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