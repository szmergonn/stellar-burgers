describe('Конструктор бургера: добавление ингредиентов', () => {
  before(() => {
    cy.interceptApiRequests();
  });

  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('должен добавлять булку в конструктор', () => {
    cy.get('[data-cy="ingredient-bun"]')
      .closest('li')
      .contains('Добавить')
      .click();

    cy.get('[data-cy="constructor-bun-top"]').should('exist');
    cy.get('[data-cy="constructor-bun-bottom"]').should('exist');
  });

  it('должен добавлять начинку в конструктор', () => {
    cy.get('[data-cy="ingredient-main"]')
      .closest('li')
      .contains('Добавить')
      .click();

    cy.get('[data-cy="constructor-ingredients"]')
      .find('[data-cy="constructor-ingredient"]')
      .should('exist');
  });

  it('должен добавлять соус в конструктор', () => {
    cy.get('[data-cy="ingredient-sauce"]')
      .closest('li')
      .contains('Добавить')
      .click();

    cy.get('[data-cy="constructor-ingredients"]')
      .find('[data-cy="constructor-ingredient"]')
      .should('exist');
  });
});
