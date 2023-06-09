export type TIngredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number | undefined;
    proteins: number;
    type: 'bun'| 'main'| 'sauce';
    _id: string;
    randomId?: string;
  }