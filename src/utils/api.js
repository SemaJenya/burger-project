const apiUrl = 'https://norma.nomoreparties.space/api';


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