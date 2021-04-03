export class Card {
    constructor(data, templateSelector = '#place', userId,{ handleCardClick},/* ,*/ {addLike}, {deleteLike}, {handleCardDeleteClick}) {
        this._data = data;
        this._userId = userId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._addLike = addLike;
        this._deleteLike = deleteLike;
        this._likesCount = this._data.likes.length;
        this._handleCardDeleteClick = handleCardDeleteClick;
        this._myLikes =  this._data.likes.filter((item) => item['_id'] === this._userId)
        console.log('CARD',this._data);
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
        this._elementLikesCount =  this._element.querySelector(".place__like-counter");
        this._elementLikesCount.textContent = this._likesCount;

        this._elementDeleteBtn = this._element.querySelector(".place__button_delete");

        if (this._data['owner']['_id'] !== this._userId) {
            this._elementDeleteBtn.remove()
        }

        if(this._myLikes.length) this._element.querySelector(".place__button_like").classList.add("place__button_like-active");

        this._elementImg = this._element.querySelector(".place__img");
        this._elementPlaceTitle = this._element.querySelector(".place__title");
        this._elementImg.src = this._data.link || this._data['place-url'];
        this._elementImg.alt = this._data.name || this._data['place-title'];
        this._elementPlaceTitle.textContent = this._data.name || this._data['place-title'];
        this.setLikeCount(this._data)
        this._setEventListeners();
        this._setIdCard();
        return this._element;
    }
    _handleLikeButton(data){
        this._element.querySelector(".place__button_like").classList.toggle("place__button_like-active");
        if(this._element.querySelector(".place__button_like").classList.contains("place__button_like-active")){
            this._addLike(data);
        }else {
            this._deleteLike(data);
        }
    }
    _setIdCard(){
        this._element.setAttribute('id', this._data['_id']);
}
    deleteCardFromPage(){
        this._element.remove();
    }

    _handleDeleteButton(data){
        this._handleCardDeleteClick(data)
    }
    setLikeCount(data) {
        this._elementLikesCount.textContent = String(data.likes.length);
    }

    _setEventListeners() {

        this._element.querySelector(".place__button_like").addEventListener('click', () => {
            this._handleLikeButton(this._data);
        })

        if(this._elementDeleteBtn) {
            this._elementDeleteBtn.addEventListener('click', ()=> {
                this._handleDeleteButton(this._data);
            })
        }

        this._element.querySelector(".place__img").addEventListener('click', ()=> {
            this._handleCardClick(this._data);
        })
    }


}