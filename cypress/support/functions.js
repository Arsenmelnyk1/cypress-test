export function verifyLandingPageIsLoaded() {
  cy.visit("/");
  cy.get("header h1").should("contain", "Memberstack User Management");
  cy.get('[data-cy="user-table"]').should("be.visible");
  cy.get('[data-cy="user-row-1"]').should("exist");
  cy.get('[data-cy="user-row-2"]').should("exist");
}

export function verifyListOfUsers(quantityOfUsers) {
  cy.get('table[data-cy="user-table"]').should('be.visible')
    .as('userTable');
  cy.get('@userTable').find('tbody tr')
    .should('have.length', quantityOfUsers)
    .as('userRows');
}

export function clearUsersList(userRowsSelector) {
  cy.get(userRowsSelector).each(($userRow, index, $list) => {
    cy.wrap($userRow)
      .find('button[data-cy*="btn-delete"]')
      .should('be.visible')
      .click({ force: true });

    cy.wait(500);
  });
}

export function addValidUsers(users) {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    cy.createUser(user.name, user.email, user.role, user.status);
  }
}

export function editUser(index, user) {
  cy.get(`tr[data-cy="user-row-${index + 1}"]`)
    .find(`button[data-cy="btn-edit-${index + 1}"]`)
    .should("be.visible")
    .and("be.enabled")
    .click();

  cy.get('form[data-cy="user-form"]').should("be.visible").as("userForm");

  cy.get("@userForm").find('input[name="name"]').clear().type(user.name);
  cy.get("@userForm").find('input[name="email"]').clear().type(user.email);
  cy.get("@userForm").find('select[name="role"]').select(user.role);
  cy.get("@userForm").find('input[name="status"]').should("be.checked");
  cy.get("@userForm").find('button[data-cy="btn-submit"]').click();
}

export function verifyToggleStatus(expectedStatus) {
  cy.get('tr[data-cy*="user-row"]').each(($userRow) => {
    cy.wrap($userRow).find('td[data-cy*="user-status"] span')
      .should('be.visible')
      .invoke('text').should('eq', expectedStatus);
  });
}

export function verifyValidationMessage(userNameExpectedMessage, emailExpectedMessage) {
  cy.get('span[data-cy="error-name"]', { timeout: 5000 }).should('be.visible')
    .and('contain', userNameExpectedMessage);
  cy.get('span[data-cy="error-email"]', { timeout: 5000 }).should('be.visible')
    .and('contain', emailExpectedMessage);
}
