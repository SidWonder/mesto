//import { imgView } from './index.js';

//Class for create card

export class Card {
    constructor(data, templateSelector = '#place', { handleCardClick }) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate(){
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);

        return cardElement;
    }

    createCard(){
        this._element = this._getTemplate();
        this._elementImg = this._element.querySelector(".place__img");
        this._elementPlaceTitle = this._element.querySelector(".place__title");
        this._elementImg.src = this._data.link || this._data['place-url'];
        this._elementImg.alt = this._data.name || this._data['place-title'];
        this._elementPlaceTitle.textContent = this._data.name || this._data['place-title'];

        this._setEventListeners();

        return this._element;
    }
//заменить на классовые перемменные как в createCard
    _setEventListeners() {

        this._element.querySelector(".place__button_like").addEventListener('click', () => {
            this._handleLikeButton();
        })
        this._element.querySelector(".place__button_delete").addEventListener('click', ()=> {
            this._handleDeleteButton();
        })
        this._element.querySelector(".place__img").addEventListener('click', ()=> {
            this._handleCardClick(this._data);
        })
    }

    _handleLikeButton(){
        this._element.querySelector(".place__button_like").classList.toggle("place__button_like-active");
    }

    _handleDeleteButton(){
        this._element.remove();
    }

    _handleImageViewerPopup(){
       // imgView(this._data.link, this._data.name);
    }
}