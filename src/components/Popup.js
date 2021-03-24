export default class Popup {

    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseBtn = this._popup.querySelector('.popup__button_close');
        this._popupStateActive = "popup_active";
        this._handleOverlayClose =  this._handleOverlayClose.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add(this._popupStateActive);
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._handleOverlayClose);
    }

    close() {
        this._popup.classList.remove(this._popupStateActive);
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._handleOverlayClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
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
    }
}