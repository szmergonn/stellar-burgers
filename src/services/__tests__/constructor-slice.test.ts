import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../slices/constructor-slice';
import { TIngredient } from '@utils-types';

describe('constructor reducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const mockBun: TIngredient = {
    _id: 'bun-id',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 100,
    image: 'bun-image',
    image_large: 'bun-image-large',
    image_mobile: 'bun-image-mobile'
  };

  const mockIngredient = {
    ...mockBun,
    _id: 'ingredient-id',
    name: 'Начинка',
    type: 'main',
    id: 'unique-id'
  };

  it('должен обрабатывать экшен добавления булки', () => {
    const nextState = constructorReducer(initialState, addBun(mockBun));

    expect(nextState.bun).toEqual(mockBun);
    expect(nextState.ingredients).toEqual([]);
  });

  it('должен обрабатывать экшен добавления ингредиента', () => {
    const nextState = constructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );

    expect(nextState.bun).toBeNull();
    expect(nextState.ingredients).toHaveLength(1);
    expect(nextState.ingredients[0]).toEqual(mockIngredient);
  });

  it('должен обрабатывать экшен удаления ингредиента', () => {
    const stateWithIngredient = {
      ...initialState,
      ingredients: [mockIngredient]
    };

    const nextState = constructorReducer(
      stateWithIngredient,
      removeIngredient(mockIngredient.id)
    );

    expect(nextState.ingredients).toHaveLength(0);
  });

  it('должен обрабатывать экшен изменения порядка ингредиентов', () => {
    const ingredient1 = { ...mockIngredient, id: 'id-1' };
    const ingredient2 = { ...mockIngredient, id: 'id-2' };
    const ingredient3 = { ...mockIngredient, id: 'id-3' };

    const stateWithIngredients = {
      ...initialState,
      ingredients: [ingredient1, ingredient2, ingredient3]
    };

    const nextState = constructorReducer(
      stateWithIngredients,
      moveIngredient({ dragIndex: 0, hoverIndex: 2 })
    );

    expect(nextState.ingredients).toHaveLength(3);
    expect(nextState.ingredients[0]).toEqual(ingredient2);
    expect(nextState.ingredients[1]).toEqual(ingredient3);
    expect(nextState.ingredients[2]).toEqual(ingredient1);
  });
});
