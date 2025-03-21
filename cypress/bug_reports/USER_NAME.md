# Issue: Invalid Username Format Allowed

## 1. **Description of the Bug**

The application allows usernames that violate the defined username rules.
Specifically, usernames can have consecutive underscores, hyphens, or spaces, and can start or end with these characters,
which should not be allowed according to the username format rules.s.

## 2. **Steps to Reproduce the Issue**

1. Go to the Memberstack user management page.
2. In the user creation form, fill in the mandatory fields with any test user data from the `invalidUsers` array in the file `cypress/fixtures/example.json`.
3. Ensure that the chosen username violates the rules (e.g., contains consecutive underscores, hyphens, or spaces, or starts/ends with these characters).
4. Click the "Add" button to submit the form.

## 3. **Expected vs. Actual Behavior**

- **Expected Behavior:**  
  The user should not be created if the username violates the format rules.
  The application should display a validation error for the username.

- **Actual Behavior:**  
  The user is created successfully even though the username contains invalid characters or patterns.

## 4. **Attachment**

- Path to screenshot: `cypress/img/invalid_username.png`
- **Invalid User List**:  
  Users were created with the following invalid usernames:
  - `Arsen--Mel` (contains consecutive hyphens)
  - `Arsen__Mel` (contains consecutive underscores)
  - `Arsen  Mel` (contains consecutive spaces)
