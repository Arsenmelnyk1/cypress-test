// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add(
//   "createUser",
//   (name, email, role = "user", status = "active") => {
//     cy.get('[data-cy="input-name"]').clear().type(name);
//     cy.get('[data-cy="input-email"]').clear().type(email);
//     cy.get('[data-cy="select-role"]').select(role);

//     if (status === "active") {
//       cy.get('[data-cy="radio-active"]').check();
//     } else {
//       cy.get('[data-cy="radio-inactive"]').check();
//     }

//     cy.get('[data-cy="btn-submit"]').click();
//   }
// );

Cypress.Commands.add(
  "createUser",
  (name, email, role, status) => {
    cy.get('[data-cy="input-name"]').clear().type(name);
    cy.get('[data-cy="input-email"]').clear().type(email);
    cy.get('[data-cy="select-role"]').select(role);

    if (status === "active") {
      cy.get('[data-cy="radio-active"]').check();
    } else {
      cy.get('[data-cy="radio-inactive"]').check();
    }
    cy.get('[data-cy="btn-submit"]').click();
  }
);
