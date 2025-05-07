describe('Создание заказа', () => {
  before(() => {
    cy.interceptApiRequests();
  });

  beforeEach(() => {
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.authenticate();
  });

  afterEach(() => {
    cy.cleanAuthData();
  });

  it('должен создать заказ и показать номер заказа', () => {
    // Добавляем булку
    cy.get('[data-cy="ingredient-bun"]').parent().contains('Добавить').click();

    // Добавляем ингредиент
    cy.get('[data-cy="ingredient-main"]').parent().contains('Добавить').click();

    // Оформляем заказ
    cy.get('[data-cy="order-button"]').click();
    cy.wait('@createOrder');

    // Проверяем номер заказа в модальном окне
    cy.get('[data-cy="order-number"]').should('contain', '12345');

    // Закрываем модальное окно
    cy.get('[data-cy="modal-close-button"]').click();

    // Проверяем, что конструктор пуст
    cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
    cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
    cy.get('[data-cy="constructor-ingredients"]')
      .find('[data-cy="constructor-ingredient"]')
      .should('not.exist');
  });
});
