'use strict'
const profileHeader = document.querySelector('.profile__header'),
    profileSubtitle = document.querySelector('.profile__subtitle');

const closeBtn = document.querySelector('.popup__button_close');
const editBtn = document.querySelector('.profile__button_edit');
const saveBtn = document.querySelector('.popup__button_save');
const popup = document.querySelector('.popup');

const profileHeaderInput = document.querySelector('#profile__header-change');
const profileSubtitleInput = document.querySelector('#profile__subtitle-change');

profileHeaderInput.value = profileHeader.innerText;
profileSubtitleInput.value = profileSubtitle.innerText;

editBtn.addEventListener('click', (event)=> {
    console.log('hi', popup)
    popup.classList.add('popup_active');
})

closeBtn.addEventListener('click', (event)=> {
    popup.classList.remove('popup_active');
});

saveBtn.addEventListener('click', (event) => {
    profileHeader.innerText = profileHeaderInput.value;
    profileHeader.insertAdjacentElement('beforeend', editBtn);
    profileSubtitle.innerText = profileSubtitleInput.value;
    popup.classList.remove('popup_active');
})
