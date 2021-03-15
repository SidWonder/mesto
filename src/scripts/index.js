"use strict";

//imports
import '../pages/index.css';
import {Card}  from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from "./Section.js";
import {initialCards} from "./constants.js";
import {settingsForValidation} from "./constants.js";
import UserInfo from './UserInfo'
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
//object with classes for validation

//popup main settings
const popupsList = Array.from(document.querySelectorAll('.popup'));
//Keycodes for needed btn


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
const placeTemplateSelector = '#place';
const placeAddBtn = document.querySelector(".profile__button_add");
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


const userInfo = new UserInfo({
    name: '.profile__header',
    about: '.profile__subtitle'
})

const popupEditProfile = new PopupWithForm(
    '.popup-profile',
    {
        submiter: (item) => {
            userInfo.setUserInfo(item);
            popupEditProfile.close();
        }}
);

const openEditProfileHandler = () => {
    const user = userInfo.getUserInfo();
    profileHeaderInput.value = user.name;
    profileSubtitleInput.value = user.profession;
    popupEditProfile.open();
}

const popupImgViewer = new PopupWithImage('.popup-image')


const cardCreator = (data) => {

    const card = new Card(data, placeTemplateSelector,{
        handleCardClick: (data)=> {
            popupImgViewer.open(data);
        }
    })
    return card;
}

const inititalCardRender = new Section({items: initialCards,
    renderer:(item)=>{
        const card = cardCreator(item);
        const cardElement = card.createCard();
        inititalCardRender.addItem(cardElement);
    }
}, '.places');
inititalCardRender.renderItems();

const popupAddPlace = new PopupWithForm(
    '.popup-place',
    {
        submiter: (data) => {
            const card = new Card(data);
            const cardElement = card.createCard();
            inititalCardRender.addItem(cardElement, 'prepend');
            popupAddPlace.close();
        }
    }
)
popupAddPlace.setEventListeners()
const openAddNewPlaceHandler = () => {
    popupAddPlace.open();
}

editProfileBtn.addEventListener('click', openEditProfileHandler)

placeAddBtn.addEventListener('click', openAddNewPlaceHandler)

const enablevl= () => {
    forms.forEach((form)=> {
        const formValid = new FormValidator(form, settingsForValidation);
        formValid._enableValidation();
    })
};
enablevl ()
//
// renderClassCard();
