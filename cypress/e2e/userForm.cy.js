import { userFormPageConstants } from "../support/constants";
import {
  clearUsersList,
  verifyListOfUsers,
  verifyLandingPageIsLoaded,
  addValidUsers,
  editUser,
  verifyToggleStatus,
  verifyValidationMessage
} from "../support/functions";

let validUsers;
let invalidUsers;
let invalidUsersNames;

describe("User Management Form - Basic Tests", () => {
  beforeEach(() => {
    verifyLandingPageIsLoaded();
    cy.fixture("example").then((data) => {
      validUsers = data.testUsers;
      invalidUsers = data.invalidInputs;
      invalidUsersNames = data.invalidUsers;
    });
  });

  it("should create user with valid data", () => {
    addValidUsers(validUsers);
    verifyListOfUsers(userFormPageConstants.totalQuantityOfValidUsers);
  });

  it("should not create user with invalid data", () => {
    cy.createUser(validUsers[2].name, validUsers[2].email, validUsers[2].role, validUsers[2].status);
    cy.get('div[data-cy="api-error"]').scrollIntoView()
      .should('be.visible')
      .invoke('text')
      .should('eq', 'Server error. Please try again.');

    verifyListOfUsers(userFormPageConstants.defaultUserQuantity);
  });

  it("should not create a list of new users with invalid user data", () => {
    validUsers.forEach((user) => {
      cy.createUser(user.name, user.email, user.role, user.status);
    });
    cy.get('div[data-cy="api-error"]').should('be.visible')
      .invoke('text').should('eq', 'Server error. Please try again.');

    verifyListOfUsers(userFormPageConstants.totalQuantityOfValidUsers);
  });

  it('should delete list of users', () => {
    verifyListOfUsers(userFormPageConstants.defaultUserQuantity);
    clearUsersList('@userRows');

    cy.get('p[data-cy="no-users"]').should('be.visible')
      .and('contain', 'No users found');
  });

  it('should verify/read list of users existed users', () => {
    verifyListOfUsers(userFormPageConstants.defaultUserQuantity);
    clearUsersList('@userRows');
    addValidUsers(validUsers);

    cy.get('table[data-cy="user-table"]', { timeout: 5000 }).should("be.visible");
    cy.get('tbody tr').each(($row, index) => {
      const user = validUsers[index];

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
    validUsers.slice(0, 2).forEach((user, index) => editUser(index, user));
  });

  it('should toggle user status', () => {
    verifyToggleStatus('active');

    cy.get('tr[data-cy*="user-row"] button[data-cy*="btn-toggle"]')
      .should("be.visible")
      .each(($toggle) => {
        cy.wrap($toggle).click();
      });

    verifyToggleStatus('inactive');
  });

  it('should validate empty user name and user email', () => {
    cy.createUser(' ', ' ', validUsers[2].role, validUsers[2].status);
    verifyValidationMessage('Name is required', 'Valid email is required');
  });

  it('should validate user name with one character', () => {
    cy.createUser(
      invalidUsers.shortName,
      ' ',
      validUsers[0].role,
      validUsers[0].status
    );
    verifyValidationMessage('Name must be at least 3 characters', 'Valid email is required');
  });

  it('should validate user name with one character', () => {
    cy.createUser(
      invalidUsers.shortName,
      ' ',
      validUsers[0].role,
      validUsers[0].status
    );
    verifyValidationMessage('Name must be at least 3 characters', 'Valid email is required');
  });

  it('should validate user with existed email', () => {
    cy.createUser(
      validUsers[0].name,
      invalidUsers.emailWithSpace,
      validUsers[0].role,
      validUsers[0].status
    );

    cy.createUser(
      validUsers[0].name,
      invalidUsers.emailWithSpace,
      validUsers[0].role,
      validUsers[0].status
    );

    cy.get('span[data-cy="error-email"]').should('be.visible')
      .and('contain', 'Email already exists');
  });

  context('Test case bellow will fail due to the bug not being fixed', () => {
    it('should validate invalid user name', () => {
      verifyListOfUsers(userFormPageConstants.defaultUserQuantity);
      clearUsersList('@userRows');
      /* 
      Typical regex for user name 
      /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/
      */
      invalidUsersNames.forEach((invalidUser) => {
        cy.createUser(invalidUser.name, invalidUser.email, invalidUser.role, invalidUser.status);
      });

      // Table should be empty and user name input should have validatoin for it. 
      cy.get('p[data-cy="no-users"]').should('be.visible')
        .and('contain', 'No users found');
    });

    it('should not validate user email with spaces', () => {
      cy.createUser(
        validUsers[0].name,
        invalidUsers.emailWithSpace,
        validUsers[0].role,
        validUsers[0].status
      );
      /* 
        Validation and example of error message 'Valid email is required' 
        or 'Email shouldn't have spaces'
  
        Simple regex for email validation from W3C HTML5 specification:
  
        `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}
        [a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$`
      */
      cy.get('span[data-cy="error-email"]').should('be.visible')
        .and('contain', 'Valid email is required');
    });
  });
});
