const apiUrl = 'https://norma.nomoreparties.space/api';
const resetPassword = 'https://norma.nomoreparties.space/api/password-reset';
const user = 'https://norma.nomoreparties.space/api';


const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((data) => Promise.reject(data))}



// Получим данные ингредиентов    
export const getIngredients = () => {
    return fetch(`${apiUrl}/ingredients`)
        .then(checkResponse)
        .then((dataIng) => {
            if(dataIng.success) {
                return dataIng.data;
            }
        })
};

//Получим информацию о заказе
export const postOrderInfo = (dataID) => {  //ID всех ингредиентов, которые находятся в конструкторе бургера
    return fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'ingredients': dataID
        })
    })
        .then(checkResponse)
        .then((data) => {
            if(data.success) {
                return data;
            }
        })
        
}
 // Страница восстановления пароля. Вводим логин и получаем код из почты
export const postPasswordRecovery = (email) => {
    return fetch(`${resetPassword}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'email': email
        })
    })
        .then(checkResponse)
        .then((data) => {
            if(data.success) {
                return data;
            }

        })       
}
// вводим новый пароль и код из почты
export const postResetPassword = (newPassword, token) => {
    return fetch(`${resetPassword}/reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'password': newPassword,
            "token": token
        })
    })
        .then(checkResponse)
        .then((data) => {
            if(data.success) {
                return data;
            }
            else {
                return console.log(data.error); 
            }

        })   
}
// регестрируемся
export const postRegistration = (email, password, userName) => {
    return fetch(`${user}/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'email': email,
            "password": password, 
            "name": userName
        })
    })
    .then(checkResponse)
        .then((data) => {
            if(data.success) {
                return data;
            }
            return Promise.reject(data);
        }) 
}

//авторизируемся
export const postLogin = () => {
    return fetch(`${user}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'email': email,
            "password": password, 
        })
    })
    .then(checkResponse)
        .then((data) => {
            if(data.success) {
                return data;
            }
            return Promise.reject(data);
        }) 
}

//получаем пользователя

export const getUser = () => {
    return fetch(`${user}/auth/user`, {
        method: 'GET',
        headers: {
            authorization: getCookie("accessToken")
        },
        body: JSON.stringify({
            'email': email,
            "password": password, 
        })
    })
}

