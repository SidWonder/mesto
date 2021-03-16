export default class UserInfo {
    constructor({name, about}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    }

    getUserInfo = () => {
        const userInfo = {
            name: this._name.textContent,
            profession: this._about.textContent,
        }
        return userInfo;
    }

    setUserInfo = (data) => {
        this._name.textContent = data['profile-name'];
        this._about.textContent = data['profile-job'];
    }
}