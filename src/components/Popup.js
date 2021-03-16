import {btnEsc, selectors} from "../utils/constants.js";

const {popupCloseButtonSelector} = selectors;

export default class Popup {

    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseBtn = this._popup.querySelector(popupCloseButtonSelector);
        this._popupStateActive = "popup_active";
    }

    open() {
        this._popup.classList.add(this._popupStateActive);
        document.addEventListener('keydown', this._handleEscClose);
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove(this._popupStateActive);
        this.removerEventListeners();
    }

    _handleEscClose(evt) {
        if (evt.keyCode === btnEsc) {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
        this._popupCloseBtn.addEventListener('click', this.close.bind(this));
        document.addEventListener('keyup', this._handleEscClose.bind(this));

    }

    removerEventListeners() {
        this._popup.removeEventListener('click', this._handleOverlayClose.bind(this));
        this._popupCloseBtn.removeEventListener('click', this.close.bind(this));
        document.removeEventListener('keyup', this._handleEscClose.bind(this));
    }
}