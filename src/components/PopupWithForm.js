import Popup from "./Popup.js";
import {settingsForValidation} from "../utils/constants";

const {formSelector,
    inputSelector} = settingsForValidation;

export default class PopupWithForm extends Popup{
    constructor(popupSelector, {submiter}) {
        super(popupSelector);
        this._submiter = submiter;
        this._form = this._popup.querySelector(formSelector);
        this._submitEvtHandler = this._submitEvtHandler.bind(this);
    }
    _submitEvtHandler(evt) {
        evt.preventDefault();
        this._submiter(this._getInputValues());
    }
    _getInputValues() {
        const inputsList = Array.from(this._form.querySelectorAll(inputSelector));
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