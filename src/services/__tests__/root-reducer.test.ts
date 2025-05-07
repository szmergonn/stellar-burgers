import rootReducer from '../reducers';

describe('rootReducer', () => {
  it('должен возвращать начальное состояние при вызове с undefined state и неизвестным action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    // Проверяем, что все слайсы присутствуют в начальном состоянии
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('auth');
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('profileOrders');
  });
});
