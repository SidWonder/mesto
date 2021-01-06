'use strict'
const profileHeader = document.querySelector('.profile__header'),
    profileHeaderText = document.querySelector('.profile__text'),
    profileSubtitle = document.querySelector('.profile__subtitle');

const closeBtn = document.querySelector('.popup__button_close');
const editBtn = document.querySelector('.profile__button_edit');
const saveBtn = document.querySelector('.popup__button_save');
const popup = document.querySelector('.popup');
const profileHeaderInput = document.querySelector('#profile__header-change');
const profileSubtitleInput = document.querySelector('#profile__subtitle-change');
const likeBtn = document.querySelectorAll('.grid__button');


profileHeaderInput.value = profileHeaderText.innerText;
profileSubtitleInput.value = profileSubtitle.innerText;

editBtn.addEventListener('click', ()=> {
    console.log('hi', popup)
    popup.classList.add('popup_active');
})

closeBtn.addEventListener('click', ()=> {
    popup.classList.remove('popup_active');
});

saveBtn.addEventListener('click', () => {
    profileHeaderText.innerText = profileHeaderInput.value;
    // profileHeader.insertAdjacentElement('beforeend', editBtn);
    // profileSubtitle.innerText = profileSubtitleInput.value;
    popup.classList.remove('popup_active');
})

likeBtn.forEach((item) => {
    item.addEventListener('click', ()=> {
        item.classList.toggle('grid__button_like')
    })
})
