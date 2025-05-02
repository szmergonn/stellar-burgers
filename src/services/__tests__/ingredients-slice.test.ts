import ingredientsReducer from '../slices/ingredients-slice';
import { TIngredient } from '@utils-types';

// Мокаем экшены, т.к. они являются асинхронными
const pendingAction = { type: 'ingredients/fetchIngredients/pending' };
const fulfilledAction = {
  type: 'ingredients/fetchIngredients/fulfilled',
  payload: [
    {
      _id: 'ingredient-id-1',
      name: 'Ингредиент 1',
      type: 'main',
      proteins: 5,
      fat: 5,
      carbohydrates: 5,
      calories: 50,
      price: 50,
      image: 'ingredient-image-1',
      image_large: 'ingredient-image-large-1',
      image_mobile: 'ingredient-image-mobile-1'
    },
    {
      _id: 'ingredient-id-2',
      name: 'Ингредиент 2',
      type: 'bun',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 100,
      image: 'ingredient-image-2',
      image_large: 'ingredient-image-large-2',
      image_mobile: 'ingredient-image-mobile-2'
    }
  ] as TIngredient[]
};
const rejectedAction = {
  type: 'ingredients/fetchIngredients/rejected',
  payload: 'Ошибка загрузки ингредиентов'
};

describe('ingredients reducer', () => {
  // Тест для проверки состояния при начале запроса
  it('должен обрабатывать экшен Request - ставить ingredientsRequest в true', () => {
    const initialState = {
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
      error: null,
      selectedIngredient: null
    };

    const nextState = ingredientsReducer(initialState, pendingAction);

    expect(nextState.ingredientsRequest).toBe(true);
    expect(nextState.ingredientsFailed).toBe(false);
    expect(nextState.error).toBeNull();
  });

  // Тест для проверки успешного завершения запроса
  it('должен обрабатывать экшен Success - записывать данные и ставить ingredientsRequest в false', () => {
    const initialState = {
      ingredients: [],
      ingredientsRequest: true,
      ingredientsFailed: false,
      error: null,
      selectedIngredient: null
    };

    const nextState = ingredientsReducer(initialState, fulfilledAction);

    expect(nextState.ingredientsRequest).toBe(false);
    expect(nextState.ingredientsFailed).toBe(false);
    expect(nextState.ingredients).toEqual(fulfilledAction.payload);
    expect(nextState.error).toBeNull();
  });

  // Тест для проверки обработки ошибки запроса
  it('должен обрабатывать экшен Failed - записывать ошибку и ставить ingredientsRequest в false', () => {
    const initialState = {
      ingredients: [],
      ingredientsRequest: true,
      ingredientsFailed: false,
      error: null,
      selectedIngredient: null
    };

    const nextState = ingredientsReducer(initialState, rejectedAction);

    expect(nextState.ingredientsRequest).toBe(false);
    expect(nextState.ingredientsFailed).toBe(true);
    expect(nextState.error).toBe(rejectedAction.payload);
  });
});
