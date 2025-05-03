/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Аутентификация пользователя через localStorage и cookie
       */
      authenticate(): Chainable<void>;
      /**
       * Очистка localStorage и cookie после теста
       */
      cleanAuthData(): Chainable<void>;
      /**
       * Перехват запросов API с фиксированными ответами
       */
      interceptApiRequests(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('authenticate', () => {
  // Устанавливаем токены в localStorage
  localStorage.setItem('accessToken', 'test-accessToken');
  localStorage.setItem('refreshToken', 'test-refreshToken');

  // Устанавливаем cookie (если они используются)
  cy.setCookie('accessToken', 'test-accessToken');
  cy.setCookie('refreshToken', 'test-refreshToken');
});

Cypress.Commands.add('cleanAuthData', () => {
  // Очистка localStorage
  cy.clearLocalStorage();

  // Очистка cookies
  cy.clearCookies();
});

Cypress.Commands.add('interceptApiRequests', () => {
  // Перехват запросов к API
  cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
    fixture: 'ingredients.json'
  }).as('getIngredients');

  cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
    fixture: 'user.json'
  }).as('getUser');

  cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
    fixture: 'order.json'
  }).as('createOrder');
});

export {};
