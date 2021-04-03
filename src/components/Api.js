export default class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    _handleOriginalResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers
        }).then(this._handleOriginalResponse)
    }

    setUserInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data['profile-name'],
                about: data['profile-job']
            })
        }).then(this._handleOriginalResponse)
    }

    setUserAvatar(data){
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data['avatar-url']
            })
        }).then(this._handleOriginalResponse)
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers
        }).then(this._handleOriginalResponse)
    }

    addNewCard(data) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data['place-title'],
                link: data['place-url']
            })
        }).then(this._handleOriginalResponse)
    }

    addLike(data){
        return fetch (`${this.baseUrl}/cards/likes/${data['_id']}`, {
            method: 'PUT',
            headers: this.headers
        }).then(this._handleOriginalResponse)
    }

    deleteLike(data){
        return fetch (`${this.baseUrl}/cards/likes/${data['_id']}`, {
            method: 'DELETE',
            headers: this.headers
        }).then(this._handleOriginalResponse)
    }

    deleteCard(data){
        return fetch(`${this.baseUrl}/cards/${data['_id']}`,{
            method: 'DELETE',
            headers: this.headers
        }).then(this._handleOriginalResponse)
    }
}