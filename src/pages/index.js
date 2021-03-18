"use strict";

//imports
import './index.css';
import {Card}  from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from "../components/Section.js";
import {settingsForValidation, initialCards, selectors} from "../utils/constants.js";
import UserInfo from '../components/UserInfo'
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
//object with classes for validation

const {profileEditButtonSelector,
    profileHeaderInputSelector,
    profileSubtitleInputSelector,
    profilePopupSelector,
    profileHeaderSelector,
    profileSubtitleSelector,
    placeAddButtonSelector,
    placeTemplateSelector,
    placesSectionSelector,
    placeAddPopupSelector,
    imageViewerPopupSelector
} = selectors;

const forms = document.querySelectorAll(settingsForValidation.formSelector);
const editProfileBtn = document.querySelector(profileEditButtonSelector);
const profileHeaderInput = document.querySelector(profileHeaderInputSelector);
const profileSubtitleInput = document.querySelector(profileSubtitleInputSelector);
const placeAddBtn = document.querySelector(placeAddButtonSelector);

const userInfo = new UserInfo({
    name: profileHeaderSelector,
    about: profileSubtitleSelector
})

const popupEditProfile = new PopupWithForm(
    profilePopupSelector,
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

const popupImgViewer = new PopupWithImage(imageViewerPopupSelector)


const cardCreator = (data) => {
    const card = new Card(data, placeTemplateSelector,{
        handleCardClick: (data)=> {
            console.log(data)
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
}, placesSectionSelector);
inititalCardRender.renderItems();

const popupAddPlace = new PopupWithForm(
    placeAddPopupSelector,
    {
        submiter: (data) => {
            const card = cardCreator(data);
            console.log(data);
            const cardElement = card.createCard();
            inititalCardRender.addItem(cardElement, 'prepend');
            popupAddPlace.close();
        }
    }
)
const openAddNewPlaceHandler = () => {
    popupAddPlace.open();
}

editProfileBtn.addEventListener('click', openEditProfileHandler)

placeAddBtn.addEventListener('click', openAddNewPlaceHandler)

const enableValidation= () => {
    forms.forEach((form)=> {
        const formValid = new FormValidator(form, settingsForValidation);
        formValid._enableValidation();
    })
};
enableValidation();
