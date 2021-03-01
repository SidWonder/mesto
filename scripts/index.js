"use strict";

//imports
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


//object with classes for validation
const settingsForValidation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    inputInvalidClass: 'form__input_type_invalid',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    errorClass: 'form__error_visible',
};

//popup main settings
const popupsList = Array.from(document.querySelectorAll('.popup'));
//Keycodes for needed btn
const btnEsc = 27;

const forms = document.querySelectorAll('.form');

//popup profile edit settings
const editProfileBtn = document.querySelector(".profile__button_edit");

const profileHeaderInput = document.querySelector('#profile__header-change');
const profileSubtitleInput = document.querySelector('#profile__subtitle-change');
const profilePop = document.querySelector('.popup-profile');
const profileHeader = document.querySelector(".profile__header");
const profileSubtitle = document.querySelector(".profile__subtitle");
const closeEditProfile = profilePop.querySelector('.popup__button_close');
const profileForm = profilePop.querySelector('.form');

//popup place add settings
const addPlaceBtn = document.querySelector(".profile__button_add");
const popupPlaceAdd = document.querySelector('.popup-place');
const placeInputTitle = document.querySelector('#place-title-change');
const placeInputUrl = document.querySelector('#place-url-change');
const placesSection = document.querySelector(".places");
const closeAddPlace = popupPlaceAdd.querySelector('.popup__button_close');
const placeAddForm = popupPlaceAdd.querySelector('.form');
//popup image view settings
const imageViewerPopup = document.querySelector('.popup-image');
const imageViewer = document.querySelector('.popup-image');
const popupImgView = document.querySelector('.popup__img');
const popupImgTitle = document.querySelector('.popup__subtitle');
const imageViewerClose = imageViewerPopup.querySelector('.popup__button_close');

//initial array with cards of places
const initialCards = [
    {
        name: "Архыз",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

//Functions

//Function for add new card
function addNewPlace(obj) {
    const newPlace = new Card(obj);
    const cardElement = newPlace.createCard();
   placesSection.prepend(cardElement);
}

//Functions for popups
//Function for changing visible of popup
function showPopup(popup){
    popup.classList.add('popup_active');
    document.addEventListener('keydown', hidePopupByKey)
}

function hidePopup(){
    document.querySelector('.popup_active').classList.remove('popup_active');
    document.removeEventListener('keydown', hidePopupByKey)
}

function hidePopupByKey(evt) {
    if(evt.keyCode === btnEsc){
    hidePopup();
}
}

function hidePopupByOutsideClick(target, curTarget){
    if(target === curTarget){
        hidePopup();
    }
}

//Function of profile edit popup
function editProfilePopupShow() {
    showPopup(profilePop);

}
function editProfile(){
    editProfilePopupShow();
    profileHeaderInput.value= profileHeader.textContent;
    profileSubtitleInput.value= profileSubtitle.textContent;
}
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileHeader.textContent = profileHeaderInput.value
    profileSubtitle.textContent = profileSubtitleInput.value
    hidePopup();
}
//Function of place add popup
function addPlace(){
    showPopup(popupPlaceAdd);

}
function handlePlaceFormSubmit(evt){
    evt.preventDefault();
        const newPlaceObj = {
            name: placeInputTitle.value,
            link: placeInputUrl.value,
        };
        addNewPlace(newPlaceObj, "start");

    placeAddForm.reset();
    hidePopup();
}
// Function of image view popup
function imgViewPopupShow(){
    showPopup(imageViewerPopup)
}
export function imgView(src, title){
    popupImgView.src = src;
    popupImgView.alt = title;
    popupImgTitle.textContent = title;
    imgViewPopupShow();
}
function hideImgViewer(){
    popupImgView.src = '';
    popupImgView.alt = '';
    popupImgTitle.textContent = '';
    hidePopup();
}

//Event Listeners
editProfileBtn.addEventListener('click', editProfile);
closeEditProfile.addEventListener('click', hidePopup);
profileForm.addEventListener('submit', handleProfileFormSubmit);
addPlaceBtn.addEventListener('click', addPlace);
closeAddPlace.addEventListener('click', hidePopup);
placeAddForm.addEventListener('submit', handlePlaceFormSubmit);
imageViewerClose.addEventListener('click', hideImgViewer);
popupsList.forEach((popup)=>
    popup.addEventListener('click', (evt)=>
        hidePopupByOutsideClick(evt.target, evt.currentTarget)));


function renderClassCard() {
    const placesArr = [...initialCards]; // создаю массив с карточками мест в который предварительно копирую содержимое массива с начальными карточками.
    // Я буду работать с этим массмвом = добавлять, изменять, удалять места без воздействия на первоначальный массив
    placesArr.forEach((item) => {
        addNewPlace(item, '#place');
})
}

const enablevl= () => {
    console.log(forms);
    forms.forEach((form)=> {
        console.log(form);
        const formValid = new FormValidator(form, settingsForValidation);
        formValid._enableValidation();
    })
};
enablevl ()


renderClassCard();

