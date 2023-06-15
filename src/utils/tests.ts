import { TIngredient } from "./types";

export const testMain: TIngredient = {
    _id: "11",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    randomId: '1'
};

export const testBun: TIngredient = {
    _id: "1",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
};

export const testBunTwo = {
    _id: "2",
    name: "Другая булка",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
};

export const testSauce: TIngredient = {
    _id: "643d69a5c3f7b9001cfa0942",
    name: "Соус Spicy-X",
    type: "sauce",
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    randomId: '2'
};

export const ingredientsArray: TIngredient[] = [
    {
        '_id': "643d69a5c3f7b9001cfa093c",
        'name': "Краторная булка N-200i",
        'type': "bun",
        'proteins': 80,
        'fat': 24,
        'carbohydrates': 53,
        'calories': 420,
        'price': 1255,
        'image': "https://code.s3.yandex.net/react/code/bun-02.png",
        'image_mobile': "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        'image_large': "https://code.s3.yandex.net/react/code/bun-02-large.png",
    },
    {
        '_id': "643d69a5c3f7b9001cfa0941",
        'name': "Биокотлета из марсианской Магнолии",
        'type': "main",
        'proteins': 420,
        'fat': 142,
        'carbohydrates': 242,
        'calories': 4242,
        'price': 424,
        'image': "https://code.s3.yandex.net/react/code/meat-01.png",
        'image_mobile': "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        'image_large': "https://code.s3.yandex.net/react/code/meat-01-large.png",
    },
    {
        '_id': "643d69a5c3f7b9001cfa0942",
        'name': "Соус Spicy-X",
        'type': "sauce",
        'proteins': 30,
        'fat': 20,
        'carbohydrates': 40,
        'calories': 30,
        'price': 90,
        'image': "https://code.s3.yandex.net/react/code/sauce-02.png",
        'image_mobile': "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        'image_large': "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    },
    {
        '_id': "643d69a5c3f7b9001cfa0948",
        'name': "Кристаллы марсианских альфа-сахаридов",
        'type': "main",
        'proteins': 234,
        'fat': 432,
        'carbohydrates': 111,
        'calories': 189,
        'price': 762,
        'image': "https://code.s3.yandex.net/react/code/core.png",
        'image_mobile': "https://code.s3.yandex.net/react/code/core-mobile.png",
        'image_large': "https://code.s3.yandex.net/react/code/core-large.png",
    }
];

export const testOrder = {
	success: true,
	name: "Space флюоресцентный бургер",
	order: {
		ingredients: [
			{
				_id: "643d69a5c3f7b9001cfa093d",
				name: "Флюоресцентная булка R2-D3",
				type: "bun",
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: "https://code.s3.yandex.net/react/code/bun-01.png",
				image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
				image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
				__v: 0
			},
			{
				_id: "643d69a5c3f7b9001cfa093d",
				name: "Флюоресцентная булка R2-D3",
				type: "bun",
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: "https://code.s3.yandex.net/react/code/bun-01.png",
				image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
				image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
				__v: 0
			},
			{
				_id: "643d69a5c3f7b9001cfa0943",
				name: "Соус фирменный Space Sauce",
				type: "sauce",
				proteins: 50,
				fat: 22,
				carbohydrates: 11,
				calories: 14,
				price: 80,
				image: "https://code.s3.yandex.net/react/code/sauce-04.png",
				image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
				image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
				__v: 0
			}
		],
		_id: "647f63628a4b62001c85560c",
		owner: {
			name: "Jane",
			email: "semajenya96@gmail.com",
			createdAt: "2023-04-18T10:04:10.573Z",
			updatedAt: "2023-05-12T17:35:12.705Z"
		},
		status: "done",
		name: "Space флюоресцентный бургер",
		createdAt: "2023-06-06T16:48:34.074Z",
		updatedAt: "2023-06-06T16:48:34.156Z",
		number: 7418,
		price: 2056
	}
}