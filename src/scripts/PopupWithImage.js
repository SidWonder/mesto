import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._popupViewImg =  this._popup.querySelector(".popup__img");
        this._popupViewTitle = this._popup.querySelector(".popup__subtitle");
    }

    open({link, name}) {
        super.open();
        this._popupViewImg.src = link;
        this._popupViewImg.alt = name;
        this._popupViewTitle.textContent = name;
    }
}