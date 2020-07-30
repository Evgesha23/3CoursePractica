export default function authHeader() { // проверка локального хранилища на userа
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) { // если вошел в систему...
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}
