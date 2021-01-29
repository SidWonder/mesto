'use strict'

const profileHeader = document.querySelector('.profile__header');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popMainWrapper = document.querySelector('.popup');
const editProfileBtn = document.querySelector('.profile__button_edit');
const addPlaceBtn = document.querySelector('.profile__button_add');
const popupTemplate = document.querySelector('#popup').content;
const popupImageTemplate = document.querySelector('#popup-image').content;
const popupSection = document.querySelector('.popup__body');
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popupProfileSet = {
    title: 'Редактировать профиль',
    formType: 'profile-edit',
    formInputTitle: 'profile-name',
    formInputSubtitle: 'profile-job',
};

const popupPlaceAddSet = {
    title: 'Новое место',
    formType: 'place-add',
    formInputTitle: 'place-name',
    formInputSubtitle: 'place-link',
};


(function renderCards() {
    const placesArr = [...initialCards]; // создаю массив с карточками мест в который предварительно копираю содержимое массива с начальными карточками. Я буду работать с этим массмвом = добавлять, изменять, удалять места без воздействия на первоначальный массив
    placesArr.forEach((item) => addNewPlace(item))
})();

function like(item) {
    item.classList.toggle('place__button_like-active')
}

function addNewPlace(obj, position = 'end') {
    const placeTemplate = document.querySelector('#place').content;
    const placesSection = document.querySelector('.places');
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
    const placeDeleteBtn = placeElement.querySelectorAll('.place__button_delete');
    const placeImgs = placeElement.querySelectorAll('.place__img');
    const placeImg = placeElement.querySelector('.place__img');
    const placeLike = placeElement.querySelector('.place__button_like');
    const placeLikes = placeElement.querySelectorAll('.place__button_like');
    placeImg.src = obj.link;
    placeImg.alt = obj.name;
    const placeTitle = placeElement.querySelector('.place__title')
    placeTitle.textContent = obj.name;

    if (position === 'end') placesSection.append(placeElement);
    if (position === 'start') placesSection.prepend(placeElement);

    placeDeleteBtn.forEach((item) => {
        item.addEventListener('click', () => removePlace(placeElement));
    });

    placeImgs.forEach((item) => {
        item.addEventListener('click', ()=> imageView(placeImg.src, placeTitle.textContent))
    })

    placeLikes.forEach((item)=> {
        item.addEventListener('click', ()=> like(placeLike))
    })

}

function removePlace(place) {
    place.remove();
}

function createPopUp(type) {

    const popupElement = popupTemplate.querySelector('.popup__content').cloneNode(true);
    const closePopupBtn = popupElement.querySelector('.popup__button_close');
    const formBody = popupElement.querySelector('.popup__form');

    popupElement.querySelector('.popup__form').name = type.formType;
    popupElement.querySelector('.popup__title').textContent = type.title;

    const popupInputTitle = popupElement.querySelector('#popup__header-change');
    popupInputTitle.name = type.formInputTitle;
    const popupInputSubtitle = popupElement.querySelector('#popup__subtitle-change');
    popupInputSubtitle.name = type.formInputSubtitle;
    popupSection.append(popupElement);
    changeVisablePopup();

    if (type.formType === 'place-add') {
        popupInputTitle.placeholder = 'Название';
        popupInputSubtitle.placeholder = 'Ссылка на картинку';
    }

    function changeVisablePopup() {

        if (popMainWrapper.classList.contains('popup_active')) {
            popupElement.remove();
        }

        popMainWrapper.classList.toggle('popup_active');
        if (popMainWrapper.classList.contains('popup_active') && type.formType === 'profile-edit') {
            popupInputTitle.value = profileHeader.innerText;
            popupInputSubtitle.value = profileSubtitle.innerText;
        }
        closePopupBtn.addEventListener('click', changeVisablePopup);
    }

    function handleFormSubmit(evt) {
        evt.preventDefault();

        if (type.formType === 'profile-edit') {
            profileHeader.innerText = popupInputTitle.value;
            profileSubtitle.innerText = popupInputSubtitle.value;
        }
        if (type.formType === 'place-add') {
            const placeName = popupInputTitle.value;
            const placeUrl = popupInputSubtitle.value;
            if (!placeName || !placeUrl) {
                alert('Введите название и ссылку на изображение нового места или закройте окно без созранения изменений');
                return;
            } else {
                const newPlaceObj = {
                    name: placeName,
                    url: placeUrl
                }
                initialCards.unshift(newPlaceObj);
                addNewPlace(newPlaceObj, 'start');
            }
        }

        changeVisablePopup();
    }

    formBody.addEventListener('submit', handleFormSubmit);
}

function imageView(src, title) {
    const popupElement = popupImageTemplate.querySelector('.image__content').cloneNode(true);
    const closePopupBtn = popupElement.querySelector('.popup__button_close');
    const popupImg = popupElement.querySelector('.image__pic');
    const popupTitle = popupElement.querySelector('.image__title');

    popupImg.src = src;
    popupImg.alt = title;
    popupTitle.textContent = title;

    popupSection.append(popupElement)

    closePopupBtn.addEventListener('click', changeVisableImageView);

    changeVisableImageView()




    function changeVisableImageView() {
        if (popMainWrapper.classList.contains('popup_active')) {
            popupElement.remove();
        }
        popMainWrapper.classList.toggle('popup_active')

    }


}


editProfileBtn.addEventListener('click', () => createPopUp(popupProfileSet));
addPlaceBtn.addEventListener('click', () => createPopUp(popupPlaceAddSet));


