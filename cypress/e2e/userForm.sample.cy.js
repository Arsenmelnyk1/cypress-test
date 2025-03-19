// This is just a sample test to give candidates an idea
// You should create your own comprehensive tests

describe("User Management Form - Basic Tests", () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit("/");
  });

  it("loads the application with initial users", () => {
    // Check if the header is visible
    cy.get("header h1").should("contain", "Memberstack User Management");

    // Check if initial users are loaded
    cy.get('[data-cy="user-table"]').should("be.visible");
    cy.get('[data-cy="user-row-1"]').should("exist");
    cy.get('[data-cy="user-row-2"]').should("exist");
  });

  it("allows adding a new user", () => {
    // Fill the form
    cy.get('[data-cy="input-name"]').type("Test User");
    cy.get('[data-cy="input-email"]').type("test@example.com");
    cy.get('[data-cy="select-role"]').select("editor");

    // Submit the form
    cy.get('[data-cy="btn-submit"]').click();

    // Verify the new user appears in the table
    // Note: This is intentionally incomplete - candidates should improve this
  });

  // More tests should be added by the candidate...
});
