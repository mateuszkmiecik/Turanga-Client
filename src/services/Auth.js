import API from './API'

const data = {};

function init() {
    let savedToken = localStorage.getItem('authToken');
    savedToken && API.setToken(savedToken);

    return API.get('/auth').then(profile => {
        data.user = profile;
        return profile
    }).catch(() => null)
}

function authenticate(userData) {
    return API.post('/auth', userData).then(response => {
        API.setToken(response.token);
        data.user = response.user;
        return data.user;
    })
}

function logout() {
    API.setToken(null);
    history.pushState("", document.title, window.location.pathname);
    location.reload()
}

export default {init, authenticate, logout}