describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    // Перехватываем запрос к API ингредиентов
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('должно открываться по клику на ингредиент', () => {
    // Открываем модальное окно ингредиента
    cy.get('[data-cy="ingredient-bun"]').click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="ingredient-details"]').should('exist');
  });

  it('должно закрываться по клику на крестик', () => {
    // Открываем модальное окно
    cy.get('[data-cy="ingredient-bun"]').click();
    cy.get('[data-cy="modal"]').should('be.visible');

    // Закрываем модальное окно
    cy.get('[data-cy="modal-close-button"]').click();

    // Проверяем, что модальное окно закрылось
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('должно закрываться по клику на оверлей', () => {
    // Открываем модальное окно
    cy.get('[data-cy="ingredient-bun"]').click();
    cy.get('[data-cy="modal"]').should('be.visible');

    // Закрываем модальное окно через оверлей
    cy.get('[data-cy="modal-overlay"]').click({ force: true });

    // Проверяем, что модальное окно закрылось
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
