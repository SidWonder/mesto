import Popup from "./Popup.js";
import {selectors} from "../utils/constants";

const {imageViewerPopupImgSelector, imageViewerPopupTitleSelector} = selectors;

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._popupViewImg =  this._popup.querySelector(imageViewerPopupImgSelector);
        this._popupViewTitle = this._popup.querySelector(imageViewerPopupTitleSelector);
    }

    open({link, name}) {
        super.open();
        this._popupViewImg.src = link;
        this._popupViewImg.alt = name;
        this._popupViewTitle.textContent = name;
    }
}