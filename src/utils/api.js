const apiUrl = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((data) => Promise.reject(data))}



// Получим данные ингредиентов    
export const getIngredients = () => {
    return fetch(`${apiUrl}/ingredients`)
        .then(checkResponse)
        .then((dataIng) => {
            if(dataIng.success) {
                console.log('123')
                console.log(typeof(dataIng.data))
                return dataIng.data;
            }
        })
};