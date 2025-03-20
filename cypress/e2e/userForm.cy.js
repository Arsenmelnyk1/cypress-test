import { userFormPageConstants } from "../support/constants";
import { clearUsersList, verifyListOfUsers, verifyLandingPageIsLoaded, addValidUsers, editUser, verifyToggleStatus } from "../support/functions";

let users;



describe("User Management Form - Basic Tests", () => {
  beforeEach(() => {
    verifyLandingPageIsLoaded();
    cy.fixture("example").then((data) => {
      users = data.testUsers;
    });
  });

  it("should create user with valid data", () => {
    addValidUsers(users);
    verifyListOfUsers(userFormPageConstants.totalQuantityOfValidUsers);
  });

  it("should not create user with invalid data", () => {
    cy.createUser(users[2].name, users[2].email, users[2].role, users[2].status);
    cy.get('div[data-cy="api-error"]').scrollIntoView()
      .should('be.visible')
      .invoke('text')
      .should('eq', 'Server error. Please try again.');

    verifyListOfUsers(userFormPageConstants.defaultUserQuantity);
  });

  it("should not create a list of new users with invalid user data", () => {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      cy.createUser(user.name, user.email, user.role, user.status);
    }
    cy.get('div[data-cy="api-error"]').should('be.visible')
      .invoke('text').should('eq', 'Server error. Please try again.');

    verifyListOfUsers(userFormPageConstants.totalQuantityOfValidUsers);
  });

  it("should delete list of users", () => {
    verifyListOfUsers(userFormPageConstants.defaultUserQuantity);
    clearUsersList('@userRows');

    cy.get('p[data-cy="no-users"]').should('be.visible')
      .and('contain', 'No users found');
  });

  it('should verify/read list of users existed users', () => {
    verifyListOfUsers(userFormPageConstants.defaultUserQuantity);
    clearUsersList('@userRows');

    addValidUsers(users);

    cy.get('table[data-cy="user-table"]', { timeout: 5000 }).should("be.visible");

    cy.get('tbody tr').each(($row, index) => {
      const user = users[index];

      cy.wrap($row).find('td[data-cy*="user-name"]').should("contain", user.name);
      cy.wrap($row).find('td[data-cy*="user-email"]').should("contain", user.email);
      cy.wrap($row).find('td[data-cy*="user-role"]').should("contain", user.role);

      if (user.status === "active") {
        cy.wrap($row).find('td[data-cy*="user-status"]').should("contain", "active");
      } else {
        cy.wrap($row).find('td[data-cy*="user-status"]').should("contain", "inactive");
      }
      cy.wrap($row).find('button[data-cy*="btn-edit"]').should("exist");
      cy.wrap($row).find('button[data-cy*="btn-delete"]').should("exist");
    });
  });

  it('should update existing users', () => {
    verifyListOfUsers(userFormPageConstants.defaultUserQuantity);

    editUser(0, users[0]);
    editUser(1, users[1]);
  });

  it('should toggle user status', () => {
    verifyToggleStatus('active');

    cy.get('tr[data-cy*="user-row"]')
      .find('button[data-cy*="btn-toggle"]')
      .should('be.visible')
      .as('toggleStatusButton');

    cy.get('@toggleStatusButton').each(($togle) => {
      cy.wrap($togle)
        .click();
    });

    verifyToggleStatus('inactive');
  });
});
