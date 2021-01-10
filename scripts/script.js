'use strict'

let formElement = document.querySelector('.popup__form'),
    profileHeader = document.querySelector('.profile__header'),
    profileSubtitle = document.querySelector('.profile__subtitle'),
    closeBtn = document.querySelector('.popup__button_close'),
    editBtn = document.querySelector('.profile__button_edit'),
    popup = document.querySelector('.popup'),
    profileHeaderInput = document.querySelector('#profile__header-change'),
    profileSubtitleInput = document.querySelector('#profile__subtitle-change');

function changeVisablePopup() {
    popup.classList.toggle('popup_active');
    if(popup.classList.contains('popup_active')) {
        profileHeaderInput.value = profileHeader.innerText;
        profileSubtitleInput.value = profileSubtitle.innerText;
    }
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileHeader.innerText = profileHeaderInput.value
    profileSubtitle.innerText = profileSubtitleInput.value
    changeVisablePopup();
}

editBtn.addEventListener('click', changeVisablePopup);
closeBtn.addEventListener('click', changeVisablePopup);
formElement.addEventListener('submit', handleFormSubmit);