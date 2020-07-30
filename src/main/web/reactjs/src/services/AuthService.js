import axios from "axios";

const API_URL = "http://localhost:8080/users/";

class AuthService { // служба аутентфикации
    login(login, password, userId) { //post {login, password} и сохранить JWT в локальном хранилище
        return axios
            .post(API_URL + userId, {
                login,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() { // удалить JWT из локального хранилища
        localStorage.removeItem("user");
    }

    register(username, email, password) { //post {логин, почта, пароль}
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() { // получить сохраненную информацию о пользователе
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();
