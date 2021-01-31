"use strict";

//popup main settings
const popMainWrapper = document.querySelector(".popup-container");
const popupCloseBtns = document.querySelectorAll('.popup__button_close');

//popup profile edit settings
const editProfileBtn = document.querySelector(".profile__button_edit");
const profileHeaderInput = document.querySelector('#profile__header-change');
const profileSubtitleInput = document.querySelector('#profile__subtitle-change');

const profilePop = document.querySelector('.popup-profile');
const profileHeader = document.querySelector(".profile__header");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileSaveBtn = document.querySelector('#popup__profile-confirm-changes');

//popup place add settings
const addPlaceBtn = document.querySelector(".profile__button_add");

const popupPlaceAdd = document.querySelector('.popup-place');
const addNewPlaceBtn = document.querySelector('#popup__add-new-place');
const placeInputTitle = document.querySelector('#place-title-change');
const placeInputUrl = document.querySelector('#place-url-change');

//popup image view settings
const imageViewer = document.querySelector('.popup-image');
const popupImgView = document.querySelector('.popup__img');
const popupImgTitle = document.querySelector('.popup__subtitle');

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
//Function for create new card with place
function addNewPlace(obj, position = "end") {
    const placeTemplate = document.querySelector("#place").content;
    const placesSection = document.querySelector(".places");
    const placeElement = placeTemplate.querySelector(".place").cloneNode(true);
    const placeDeleteBtn = placeElement.querySelectorAll(".place__button_delete");
    const placeImg = placeElement.querySelector(".place__img");
    const placeLike = placeElement.querySelector(".place__button_like");
    const placeLikes = placeElement.querySelectorAll(".place__button_like");
    const placeTitle = placeElement.querySelector(".place__title");

    placeImg.src = obj.link;
    placeImg.alt = obj.name;
    placeTitle.textContent = obj.name;

    if (position === "end") placesSection.append(placeElement);
    if (position === "start") placesSection.prepend(placeElement);

    placeDeleteBtn.forEach((item) => {
        item.addEventListener("click", () => removePlace(placeElement));
    });

    placeLikes.forEach((item) => {
        item.addEventListener("click", () => like(placeLike));
    });
    placeImg.addEventListener('click', ()=> imageView(placeImg.src, placeImg.alt))
}
//Function for remove cards with place
function removePlace(place) {
    place.remove();
}

//Functions for popups
//Function for changing visible of popup
function changeVisiblePopup(popup) {
    popMainWrapper.classList.toggle('popup_active');
    popup.classList.toggle('popup_disable');

    if(popup.classList.contains('popup-profile')){
        profileHeaderInput.value = profileHeader.textContent;
        profileSubtitleInput.value = profileSubtitle.textContent
    }

    if(popup.classList.contains('popup-image')){
        popMainWrapper.classList.toggle('popup-container-image');
    }
}
//Function of profile edit popup
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileHeader.textContent = profileHeaderInput.value
    profileSubtitle.textContent = profileSubtitleInput.value
    changeVisiblePopup(profilePop);
}
//Function of place add popup
function handlePlaceFormSubmit(evt){
    evt.preventDefault();
    const placeName = placeInputTitle.value;
    const placeUrl = placeInputUrl.value;
    if (!placeName || !placeUrl) {
        alert(
            "Введите название и ссылку на изображение нового места или закройте окно без созранения изменений"
        );
        return;
    } else {
        const newPlaceObj = {
            name: placeName,
            link: placeUrl,
        };
        console.log(newPlaceObj)
        initialCards.unshift(newPlaceObj);
        addNewPlace(newPlaceObj, "start");
    }
    placeInputTitle.value = '';
    placeInputUrl.value = '';
    changeVisiblePopup(popupPlaceAdd);
}
//Function of image view popup
function imageView(src, title) {
    popupImgView.src = src;
    popupImgView.alt = title;
    popupImgTitle.textContent = title;
    changeVisiblePopup(imageViewer);
}

//Event Listeners
//Make 1 function for every close buttons of popup
popupCloseBtns.forEach((item) => item.addEventListener('click', () => changeVisiblePopup(item.parentNode)));
profileSaveBtn.addEventListener('click', handleProfileFormSubmit)
editProfileBtn.addEventListener('click', () =>  changeVisiblePopup(profilePop));
addPlaceBtn.addEventListener('click', () => changeVisiblePopup(popupPlaceAdd));
addNewPlaceBtn.addEventListener('click', handlePlaceFormSubmit)