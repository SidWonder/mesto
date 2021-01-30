"use strict";

const profileHeader = document.querySelector(".profile__header");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popMainWrapper = document.querySelector(".popup__container");
const editProfileBtn = document.querySelector(".profile__button_edit");
const addPlaceBtn = document.querySelector(".profile__button_add");
// const popupTemplate = document.querySelector("#popup").content;
// const popupImageTemplate = document.querySelector("#popup-image").content;
const popupSection = document.querySelector(".popup__body");
const popup = document.querySelector('.popup');
const profileHeaderInput = document.querySelector('#profile__header-change');
const profileSubtitleInput = document.querySelector('#profile__subtitle-change');

const profilePop = document.querySelector('.popup_profile')
function changeVisablePopup(popup) {
    popMainWrapper.classList.toggle('popup_active');
    popup.classList.toggle('popup_disable');

    if(popup.classList.contains('popup_profile')){
        profileHeaderInput.value = profileHeader.innerText;
        profileSubtitleInput.value = profileSubtitle.innerText
    }
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileHeader.innerText = profileHeaderInput.value
    profileSubtitle.innerText = profileSubtitleInput.value
    changeVisablePopup(profilePop);
}
const popupPlaceAdd = document.querySelector('.popup_place');
const addNewPlaceBtn = document.querySelector('#popup__add-new-place');
const placeInputTitle = document.querySelector('#place-title-change');
const placeInputUrl = document.querySelector('#place-url-change');



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
    changeVisablePopup(popupPlaceAdd);
}

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

(function renderCards() {
    const placesArr = [...initialCards]; // создаю массив с карточками мест в который предварительно копираю содержимое массива с начальными карточками. Я буду работать с этим массмвом = добавлять, изменять, удалять места без воздействия на первоначальный массив
    placesArr.forEach((item) => addNewPlace(item));
})();

function like(item) {
    item.classList.toggle("place__button_like-active");
}

function addNewPlace(obj, position = "end") {
    const placeTemplate = document.querySelector("#place").content;
    const placesSection = document.querySelector(".places");
    const placeElement = placeTemplate.querySelector(".place").cloneNode(true);
    const placeDeleteBtn = placeElement.querySelectorAll(".place__button_delete");
    // const placeImgs = placeElement.querySelectorAll(".place__img");
    const placeImg = placeElement.querySelector(".place__img");
    const placeLike = placeElement.querySelector(".place__button_like");
    const placeLikes = placeElement.querySelectorAll(".place__button_like");
    placeImg.src = obj.link;
    placeImg.alt = obj.name;
    const placeTitle = placeElement.querySelector(".place__title");
    placeTitle.textContent = obj.name;

    if (position === "end") placesSection.append(placeElement);
    if (position === "start") placesSection.prepend(placeElement);
    placeDeleteBtn.forEach((item) => {
        item.addEventListener("click", () => removePlace(placeElement));
    });



    placeLikes.forEach((item) => {
        item.addEventListener("click", () => like(placeLike));
    });
}

function removePlace(place) {
    place.remove();
}

// function changeVisablePopup() {
//     popup.classList.toggle('popup_active');
//     profileHeaderInput.value = profileHeader.innerText;
//     profileSubtitleInput.value = profileSubtitle.innerText;
// }


// function createPopUp(type) {
//     const popupElement = popupTemplate
//         .querySelector(".popup__content")
//         .cloneNode(true);
//     const closePopupBtn = popupElement.querySelector(".popup__button_close");
//     const formBody = popupElement.querySelector(".popup__form");
//
//     popupElement.querySelector(".popup__form").name = type.formType;
//     popupElement.querySelector(".popup__title").textContent = type.title;
//
//     const popupInputTitle = popupElement.querySelector("#popup__header-change");
//     popupInputTitle.name = type.formInputTitle;
//     const popupInputSubtitle = popupElement.querySelector(
//         "#popup__subtitle-change"
//     );
//     popupInputSubtitle.name = type.formInputSubtitle;
//     popupSection.append(popupElement);
//     changeVisablePopup();
//
//     if (type.formType === "place-add") {
//         popupInputTitle.placeholder = "Название";
//         popupInputSubtitle.placeholder = "Ссылка на картинку";
//     }
//
//     function changeVisablePopup() {
//         if (popMainWrapper.classList.contains("popup_active")) {
//             popupElement.remove();
//         }
//
//         popMainWrapper.classList.toggle("popup_active");
//         if (
//             popMainWrapper.classList.contains("popup_active") &&
//             type.formType === "profile-edit"
//         ) {
//             popupInputTitle.value = profileHeader.innerText;
//             popupInputSubtitle.value = profileSubtitle.innerText;
//         }
//         closePopupBtn.addEventListener("click", changeVisablePopup);
//     }
//
//     function handleFormSubmit(evt) {
//         evt.preventDefault();
//
//         if (type.formType === "profile-edit") {
//             profileHeader.innerText = popupInputTitle.value;
//             profileSubtitle.innerText = popupInputSubtitle.value;
//         }
//         if (type.formType === "place-add") {
//             const placeName = popupInputTitle.value;
//             const placeUrl = popupInputSubtitle.value;
//             if (!placeName || !placeUrl) {
//                 alert(
//                     "Введите название и ссылку на изображение нового места или закройте окно без созранения изменений"
//                 );
//                 return;
//             } else {
//                 const newPlaceObj = {
//                     name: placeName,
//                     url: placeUrl,
//                 };
//                 initialCards.unshift(newPlaceObj);
//                 addNewPlace(newPlaceObj, "start");
//             }
//         }
//
//         changeVisablePopup();
//     }
//
//     formBody.addEventListener("submit", handleFormSubmit);
// }
const
function imageView(src, title) {
    // const popupElement = popupImageTemplate
    //     .querySelector(".image__content")
    //     .cloneNode(true);
    // const closePopupBtn = popupElement.querySelector(".popup__button_close");
    // const popupImg = popupElement.querySelector(".image__pic");
    // const popupTitle = popupElement.querySelector(".image__title");

    popupImg.src = src;
    popupImg.alt = title;
    popupTitle.textContent = title;

    popupSection.append(popupElement);

    closePopupBtn.addEventListener("click", changeVisableImageView);

    changeVisableImageView();

    function changeVisableImageView() {
        if (popMainWrapper.classList.contains("popup_active")) {
            popupElement.remove();
        }
        popMainWrapper.classList.toggle("popup_active");
    }
}


const popupCloseBtns = document.querySelectorAll('.popup__button_close');
popupCloseBtns.forEach((item) => item.addEventListener('click', () => changeVisablePopup(item.parentNode)));

const profileSaveBtn = document.querySelector('#popup__profile-confirm-changes');

const placeImgs = document.querySelectorAll('.place__img');
placeImgs.forEach((item) => {
    item.addEventListener("click", () =>
        imageView(item.src, item.textContent)
    );
});
profileSaveBtn.addEventListener('click', handleProfileFormSubmit)
editProfileBtn.addEventListener('click', () =>  changeVisablePopup(profilePop));
addPlaceBtn.addEventListener('click', () => changeVisablePopup(popupPlaceAdd));
addNewPlaceBtn.addEventListener('click', handlePlaceFormSubmit)