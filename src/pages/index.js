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
import PopupWithConfirm from "../components/PopupWithConfirm";
import Api from "../components/Api";
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
    imageViewerPopupSelector,
    confirmPopupSelector,
    avatarEditButtonSelector,
    avatarSelector,
    avatarPopupSelector
} = selectors;

const forms = document.querySelectorAll(settingsForValidation.formSelector);
const editProfileBtn = document.querySelector(profileEditButtonSelector);
const profileHeaderInput = document.querySelector(profileHeaderInputSelector);
const profileSubtitleInput = document.querySelector(profileSubtitleInputSelector);
const placeAddBtn = document.querySelector(placeAddButtonSelector);
const avatarEditButton = document.querySelector(avatarEditButtonSelector);
let authorId = null;

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: '106173b1-6f76-485f-b86e-e9e649d98c04',
        'Content-Type': 'application/json'
    }
});



const userInfo = new UserInfo({
    name: profileHeaderSelector,
    about: profileSubtitleSelector,
    avatar: avatarSelector
})

const popupEditProfile = new PopupWithForm(
    profilePopupSelector,
    {
        submiter: (data) => {
            popupEditProfile.renderLoading(true);
            api.setUserInfo(data)
                .then((res) => {
                    userInfo.setUserInfo(res)
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    popupEditProfile.renderLoading(false);
                    popupEditProfile.close()});

        }}
);

popupEditProfile.setEventListeners();
const openEditProfileHandler = () => {
    const user = userInfo.getUserInfo();
    profileHeaderInput.value = user.name;
    profileSubtitleInput.value = user.profession;
    popupEditProfile.open();
}

const popupDeleteCard = new PopupWithConfirm(confirmPopupSelector, {
    submiter: (data, card) => {
        // popupDeleteCard.renderLoading(true);
        api.deleteCard(data)
            .then(() => {
                card._deleteCard();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                // popupDeleteCard.renderLoading(false);
                popupDeleteCard.close();
            });
    }
})
popupDeleteCard.setEventListeners();

const popupAvatarEdit = new PopupWithForm(avatarPopupSelector, {
    submiter: (data)=> {
        popupAvatarEdit.renderLoading(true);
        api.setUserAvatar(data)
            .then((res) => {
                userInfo.setUserAvatar(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupAvatarEdit.renderLoading(false);
                popupAvatarEdit.close();
            })
    }
})
popupAvatarEdit.setEventListeners();

const popupImgViewer = new PopupWithImage(imageViewerPopupSelector)
popupImgViewer.setEventListeners();

const cardCreator = (data) => {
    const card = new Card(data, placeTemplateSelector, authorId ,{
        handleCardClick: (data)=> {
            popupImgViewer.open(data);
        }},
        {
        addLike: (data) => {
            api.addLike(data)
                .then((data) => {
                    card.setLikeCount(data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        },
        {
            deleteLike: (data) => {
                console.log(data)
                api.deleteLike(data)
                    .then((data) => {
                        card.setLikeCount(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },
        {
            handleCardDeleteClick: (data)=> {
                popupDeleteCard.open(data, card);
            }
        }
        )
    return card;
}

const inititalCardRender = new Section({/*items: initialCards,*/
    renderer:(item)=>{
        const card = cardCreator(item);
        const cardElement = card.createCard();
        inititalCardRender.addItem(cardElement);
    }
}, placesSectionSelector);

const popupAddPlace = new PopupWithForm(
    placeAddPopupSelector,
    {
        submiter: (data) => {
            popupAddPlace.renderLoading(true);
            api.addNewCard(data)
                .then((res)=> {
                    const card = cardCreator(res);
                    const cardElement = card.createCard();
                    inititalCardRender.addItem(cardElement, 'prepend');
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    popupAddPlace.renderLoading(false);
                    popupAddPlace.close();
                });


        }
    }
)

popupAddPlace.setEventListeners();
const openAddNewPlaceHandler = () => {
    popupAddPlace.open();
}

editProfileBtn.addEventListener('click', openEditProfileHandler)

placeAddBtn.addEventListener('click', openAddNewPlaceHandler)

avatarEditButton.addEventListener('click', ()=>{
    popupAvatarEdit.open()
    console.log('try to set avatar')
})

const enableValidation= () => {
    forms.forEach((form)=> {
        const formValid = new FormValidator(form, settingsForValidation);
        formValid.enableValidation();
    })
};
enableValidation();

const usInfo = api.getUserInfo()
    .then((data) => {
        authorId = data['_id'];
        userInfo.setUserInfo(data)
        userInfo.setUserAvatar(data);
    })
    .catch((err) => {
        console.log(err);
    })

const aptGetInitialCards = api.getInitialCards()
    .then(data => {
        inititalCardRender.renderItems(data);
    });