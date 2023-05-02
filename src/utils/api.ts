import { getCookie, setCookie } from "./cookie";
import { TIngredient } from "./types";

const apiUrl = 'https://norma.nomoreparties.space/api';

export type UserObject = {
    email: string;
    name: string;
}

export type UserResponse = {
    success: boolean;
    user: UserObject;
    accessToken: string;
    refreshToken: string;
}

export type GetUserResponse = {
    success: boolean;
    user: UserObject;
}

export type UserRegister = {
    password: string;
} & UserObject;

export type UserLogin = {
    password: string;
    email: string;
} 

export type UserLogout = {
    message: string;
    success: boolean;
} 

export type RefreshResponse = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
} 

export interface RequestInitWithAuth extends RequestInit {
    headers?: HeadersInit | {authorization?: string | undefined}
}

export type OrderNumber = {
    number: number
}

export type OrderResponse = {
    success: boolean | null;
    name: string| null;
    order: OrderNumber| null;
}

type IngredientsResponse = {
    success: boolean;
    data: TIngredient[];
}



const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((error) => Promise.reject({...error, statusCode: res.status}))}

// функция-обертка для автоматического обновления токена через ревреш токен
export const fetchRefresh = async <T>(url: RequestInfo, options: RequestInitWithAuth) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse<T>(res)
    } catch (error: any) {
        console.log('fetchRefresh', error);
        if(error.statusCode === 401 || error.statusCode === 403) {
            const refreshData = await refreshToken();
            if(!refreshData.success) {
                Promise.reject(refreshData)
            }
            setCookie('accessToken', refreshData.accessToken);
            setCookie('refreshToken', refreshData.refreshToken);

            const res = await fetch(url, {...options, headers: {...options.headers, authorization: refreshData.accessToken}});
            return await checkResponse<T>(res)
        }
        else {
            Promise.reject(error)
        }
    }
}

// Получим данные ингредиентов    
export const getIngredients = ()  => {
    return fetch(`${apiUrl}/ingredients`)
        .then(checkResponse<IngredientsResponse>)
        .then((dataIng) => {
            if(dataIng.success) {
                return dataIng.data;
            }
        })
};

//Получим информацию о заказе
export const postOrderInfo = (dataID: string[]) => {  //ID всех ингредиентов, которые находятся в конструкторе бургера
    return fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'ingredients': dataID
        })
    })
        .then(checkResponse<OrderResponse>)
        .then((data) => {
            if(data.success) {
                return data;
            }
        })
        
}
 // Страница восстановления пароля. Вводим логин и получаем код из почты
export const postPasswordRecovery = (email: string)  => {
    return fetch(`${apiUrl}/password-reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'email': email
        })
    })
        .then(checkResponse<UserResponse>)
        .then((data) => {
            if(data?.success) {
                return data;
            }

        })       
}
// вводим новый пароль и код из почты
export const postResetPassword = (newPassword: string, token: string) => {
    return fetch(`${apiUrl}/password-reset/reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'password': newPassword,
            "token": token
        })
    })
        .then(checkResponse<UserResponse>)
        .then((data) => {
            if(data.success) {
                return data;
            }
            else {
                return console.log(Error); 
            }

        })   
}
// регестрируемся
export const postRegistration = (userData: UserRegister): Promise<UserResponse> => {
    return fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'email': userData.email,
            "password": userData.password, 
            "name": userData.name
        })
    })
    .then(checkResponse<UserResponse>)
        .then((data) => {
            if(data.success) {
                return data;
            }
            return Promise.reject(data);
        }) 
}

//авторизируемся
export const postLogin = (userData: UserLogin): Promise<UserResponse> => {
    return fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'email': userData.email,
            "password": userData.password, 
        })
    })
    .then(checkResponse<UserResponse>)
        .then((data) => {
            if(data.success) {
                return data;
            }
            return Promise.reject(data);
        }) 
}

//получим рефреш токена
export const refreshToken = (): Promise<RefreshResponse>  => {
    return fetch(`${apiUrl}/auth/token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: getCookie("refreshToken")
        })
    })
    .then(checkResponse<RefreshResponse>)

}

//получаем пользователя
export const getUser = () => {
    return fetchRefresh<GetUserResponse>(`${apiUrl}/auth/user`, {
        method: 'GET',
        headers: {
            authorization: getCookie("accessToken")
        },
    })
    .then((data) => {
        if(data?.success) {
            return data;
        }
        return Promise.reject(data);
    }) 
}


// изменяем данные о юзере в провиле
export const updateUserData = (userData: UserRegister): Promise<GetUserResponse>=> {
    return fetch(`${apiUrl}/auth/user`, {
        method: 'PATCH',
        headers: {
            authorization: getCookie("accessToken"),
            "Content-Type": "application/json"
        } as HeadersInit | {authorization?: string | undefined},
        body: JSON.stringify({
            'email': userData.email,
            "password": userData.password, 
            "name": userData.name
        })
    })
    .then(checkResponse<GetUserResponse>)
    .then((data) => {
        if(data.success) {
            return data;
        }
        return Promise.reject(data);
    }) 
}

// выход из системы
export const logoutUser = (): Promise<UserLogout>  => {
    return fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'token': getCookie("refreshToken")
        })
    })
    .then(checkResponse<UserLogout>)
    .then((data) => {
        if(data.success) {
            return data;
            
        }
        return Promise.reject(data);
    }) 
}

