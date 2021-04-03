export default class UserInfo {
    constructor({name, about, avatar}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar)
    }

    getUserInfo = () => {
        const userInfo = {
            name: this._name.textContent,
            profession: this._about.textContent,
        }
        return userInfo;
    }

    setUserAvatar(data) {
        this._avatar.src = data.avatar;
    }

    setUserInfo = (data) => {
        console.log('setUserInfo USERINFO',data)
        this._name.textContent = data.name;
        this._about.textContent = data.about;
    }
}