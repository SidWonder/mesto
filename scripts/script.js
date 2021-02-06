"use strict";

//popup main settings
const popupsList = Array.from(document.querySelectorAll('.popup'));
//Keycodes for needed btn
const btnEsc = 27;

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

//Functions for cards
//Rendering cards on first start
(function renderCards() {
    const placesArr = [...initialCards]; // создаю массив с карточками мест в который предварительно копираю содержимое массива с начальными карточками. Я буду работать с этим массмвом = добавлять, изменять, удалять места без воздействия на первоначальный массив
    placesArr.forEach((item) => addNewPlace(item));
})();
//Function for likes/dislikes
function like(item) {
    item.classList.toggle("place__button_like-active");
}

//Function for crete new card with place
function createCard (obj) {
    const placeTemplate = document.querySelector("#place").content;
    const placeElement = placeTemplate.querySelector(".place").cloneNode(true);
    const placeDeleteBtn = placeElement.querySelectorAll(".place__button_delete");
    const placeImg = placeElement.querySelector(".place__img");
    const placeLike = placeElement.querySelector(".place__button_like");
    const placeLikes = placeElement.querySelectorAll(".place__button_like");
    const placeTitle = placeElement.querySelector(".place__title");

    placeImg.src = obj.link;
    placeImg.alt = obj.name;
    placeTitle.textContent = obj.name;
    placeDeleteBtn.forEach((item) => {
        item.addEventListener("click", () => removePlace(placeElement));
    });
    placeLikes.forEach((item) => {
        item.addEventListener("click", () => like(placeLike));
    });
    placeImg.addEventListener('click', ()=> imgView(placeImg.src, placeImg.alt));
    return placeElement;
}

//Function for add new card
function addNewPlace(obj, position = "end") {
    const newPlace = createCard(obj);
    if (position === "end") placesSection.append(newPlace);
    if (position === "start") placesSection.prepend(newPlace);
}
//Function for remove cards with place
function removePlace(place) {
    place.remove();
}

//Functions for popups
//Function for changing visible of popup
function showPopup(popup){
    popup.classList.add('popup_active');
    document.addEventListener('keydown', (evt)=> hidePopupByKey(evt.keyCode))
}

function hidePopup(){
    document.querySelector('.popup_active').classList.remove('popup_active');
    document.removeEventListener('keydown', (evt)=> hidePopupByKey(evt.keyCode))
}

function hidePopupByKey(key) {
if(key === btnEsc){
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

    // placeInputTitle.value = '';
    // placeInputUrl.value = '';
    placeAddForm.reset();
    hidePopup();
}
//Function of image view popup
function imgViewPopupShow(){
    showPopup(imageViewerPopup)
}
function imgView(src, title){
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
