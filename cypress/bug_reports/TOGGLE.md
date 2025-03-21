# Issue: User Status Toggle Button Shift on UI

## 1. **Description of the Bug**

When toggling the user status between "active" and "inactive," the status toggle button shifts its position on the UI.
This causes misalignment in the table, making the interface look inconsistent.

## 2. **Steps to Reproduce the Issue**

1. Go to the memberstack user management page.
2. Create 5 new users with different statuses ("active" and "inactive").
3. Observe the position of the status toggle button for each user in the table.

## 3. **Expected vs. Actual Behavior**

- **Expected Behavior:**  
  The status toggle button should remain in the same position in the table, regardless of the "active" or "inactive" status.

- **Actual Behavior:**  
  The toggle button shifts position when toggling the user status between "active" and "inactive."

## 4. **Attachment**

Path to screenshot: `cypress/img/toggle_ui.png`
