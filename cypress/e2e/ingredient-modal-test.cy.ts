describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    // Перехватываем запрос к API ингредиентов
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');

    // Находим элементы один раз и сохраняем как алиасы
    cy.get('[data-cy="ingredient-bun"]').as('bunIngredient');
  });

  it('должно открываться по клику на ингредиент и отображать информацию о выбранном ингредиенте', () => {
    // Проверяем, что модальное окно отсутствует на экране
    cy.get('[data-cy="modal"]').should('not.exist');

    // Запоминаем имя ингредиента (булки) перед кликом
    cy.get('@bunIngredient')
      .find('p.text.text_type_main-default')
      .invoke('text')
      .as('ingredientName');

    // Открываем модальное окно ингредиента
    cy.get('@bunIngredient').click();

    // Сохраняем ссылки на элементы модального окна
    cy.get('[data-cy="modal"]').as('modal');
    cy.get('[data-cy="ingredient-details"]').as('ingredientDetails');

    // Проверяем, что модальное окно открылось
    cy.get('@modal').should('be.visible');
    cy.get('@ingredientDetails').should('exist');

    // Проверяем, что в модальном окне отображается правильный ингредиент
    cy.get('@ingredientName').then((ingredientName) => {
      cy.get('@ingredientDetails')
        .find('h3.text.text_type_main-medium')
        .should('contain.text', ingredientName);
    });
  });

  it('должно закрываться по клику на крестик', () => {
    // Проверяем, что модальное окно отсутствует на экране
    cy.get('[data-cy="modal"]').should('not.exist');

    // Открываем модальное окно
    cy.get('@bunIngredient').click();

    // Сохраняем ссылки на элементы модального окна
    cy.get('[data-cy="modal"]').as('modal');
    cy.get('[data-cy="modal-close-button"]').as('closeButton');

    // Проверяем, что модальное окно открылось
    cy.get('@modal').should('be.visible');

    // Закрываем модальное окно
    cy.get('@closeButton').click();

    // Проверяем, что модальное окно закрылось
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('должно закрываться по клику на оверлей', () => {
    // Проверяем, что модальное окно отсутствует на экране
    cy.get('[data-cy="modal"]').should('not.exist');

    // Открываем модальное окно
    cy.get('@bunIngredient').click();

    // Сохраняем ссылки на элементы модального окна
    cy.get('[data-cy="modal"]').as('modal');
    cy.get('[data-cy="modal-overlay"]').as('overlay');

    // Проверяем, что модальное окно открылось
    cy.get('@modal').should('be.visible');

    // Закрываем модальное окно через оверлей
    cy.get('@overlay').click({ force: true });

    // Проверяем, что модальное окно закрылось
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
