import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._popupViewImg =  this._popup.querySelector('.popup__img');
        this._popupViewTitle = this._popup.querySelector('.popup__subtitle');
    }

    open(data) {
        super.open();
        this._popupViewImg.src = data.link || data['place-url'];;
        this._popupViewImg.alt = data.name || data['place-title'];;
        this._popupViewTitle.textContent = data.name|| data['place-title'];;
    }
}