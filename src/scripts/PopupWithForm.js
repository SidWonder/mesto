import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, {submiter}) {
        super(popupSelector);
        console.log(popupSelector)
        this._submiter = submiter;
        this._form = this._popup.querySelector('.form');
        this._submitEvtHandler = this._submitEvtHandler.bind(this);
    }
    _submitEvtHandler(evt) {
        evt.preventDefault();
        this._submiter(this._getInputValues());
    }
    _getInputValues() {
        const inputsList = Array.from(this._form.querySelectorAll('.form__input'));
        const data = {};

        inputsList.forEach(input => {
            console.log(input.value)
            data[input.name] = input.value;
        })
        return data;
    };

    close() {
        super.close();
    }

    setEventListeners() {
        this._form.addEventListener('submit', this._submitEvtHandler);
        super.setEventListeners();


    }
}