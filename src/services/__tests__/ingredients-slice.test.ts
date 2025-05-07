import ingredientsReducer, {
  fetchIngredients
} from '../slices/ingredients-slice';
import { TIngredient } from '@utils-types';

// Создаем мок для имитации асинхронного запроса
jest.mock('../../utils/burger-api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('ingredients reducer', () => {
  const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    error: null,
    selectedIngredient: null
  };

  // Тестовые данные для имитации ответа API
  const mockIngredients = [
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
  ] as TIngredient[];

  // Тест для проверки состояния при начале запроса
  it('должен обрабатывать экшен Request - ставить ingredientsRequest в true', () => {
    const action = fetchIngredients.pending('', undefined);
    const nextState = ingredientsReducer(initialState, action);

    expect(nextState.ingredientsRequest).toBe(true);
    expect(nextState.ingredientsFailed).toBe(false);
    expect(nextState.error).toBeNull();
  });

  // Тест для проверки успешного завершения запроса
  it('должен обрабатывать экшен Success - записывать данные и ставить ingredientsRequest в false', () => {
    const action = fetchIngredients.fulfilled(mockIngredients, '', undefined);
    const nextState = ingredientsReducer(
      { ...initialState, ingredientsRequest: true },
      action
    );

    expect(nextState.ingredientsRequest).toBe(false);
    expect(nextState.ingredientsFailed).toBe(false);
    expect(nextState.ingredients).toEqual(mockIngredients);
    expect(nextState.error).toBeNull();
  });

  // Тест для проверки обработки ошибки запроса
  it('должен обрабатывать экшен Failed - записывать ошибку и ставить ingredientsRequest в false', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const action = fetchIngredients.rejected(
      new Error(errorMessage),
      '',
      undefined,
      errorMessage
    );
    const nextState = ingredientsReducer(
      { ...initialState, ingredientsRequest: true },
      action
    );

    expect(nextState.ingredientsRequest).toBe(false);
    expect(nextState.ingredientsFailed).toBe(true);
    expect(nextState.error).toBe(errorMessage);
  });
});
