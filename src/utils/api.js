import { getCookie, setCookie } from "./cookie";

const apiUrl = 'https://norma.nomoreparties.space/api';
const resetPassword = 'https://norma.nomoreparties.space/api/password-reset';
const user = 'https://norma.nomoreparties.space/api';


const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((error) => Promise.reject({...error, statusCode: res.status}))}

// функция-обертка для автоматического обновления токена через ревреш токен
export const fetchRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res)
    } catch (error) {
        console.log('fetchRefresh', error);
        if(error.statusCode === 401 || error.statusCode === 403) {
            const refreshData = await refreshToken();
            if(!refreshToken.success) {
                Promise.reject(refreshData)
            }
            setCookie('accessToken', refreshData.accessToken);
            setCookie('refreshToken', refreshData.refreshToken);

            const res = await fetch(url, {...options, headers: {...options.headers, authorization: refreshData.accessToken}});
            return await checkResponse(res)
        }
        else {
            Promise.reject(error)
        }
    }
}

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
export const postLogin = (email, password) => {
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

//получим ревреш токена
export const refreshToken = () => {
    return fetch(`${user}/auth/token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: getCookie("refreshToken")
        })
    })
    .then(checkResponse)

}

//получаем пользователя
export const getUser = () => {
    return fetchRefresh(`${user}/auth/user`, {
        method: 'GET',
        headers: {
            authorization: getCookie("accessToken")
        },
    })
    .then((data) => {
        if(data.success) {
            return data;
        }
        return Promise.reject(data);
    }) 
}

