export const SET_LOGGED_IN = "SET_LOGGED_IN";

export function setLoggedIn(loggedIn){
    return {
        type: SET_LOGGED_IN,
        loggedIn
    }
}

export const userPostFetch = user => {
    return dispatch => {
        return fetch("http://localhost:8080/createUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({user})
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.message) {
                    //Тут прописываем логику
                } else {
                    localStorage.setItem("token", data.jwt)
                    dispatch(loginUser(data.user))
                }
            })
    }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})
