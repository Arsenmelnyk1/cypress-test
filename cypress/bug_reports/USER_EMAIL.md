# Issue: Email Validation Message Not Positioned Below Input Field

## 1. **Description of the Bug**

When entering an email address without the "@" symbol, a validation message appears stating
that the email should contain the "@" symbol. The same issue occurs with a dot in the user name.
Best practice for form validation is to position the error message directly below the input field where the issue occurred.
This allows users to quickly identify and address the error, improving the overall user experience.

## 2. **Steps to Reproduce the Issue**

1. Go to the Memberstack user management page.
2. In the user creation form, fill in the mandatory fields.
   - Use the email `qwertycom` or `qwerty@.com`.
3. Click the "Add" button to submit the form.

## 3. **Expected vs. Actual Behavior**

- **Expected Behavior:**  
  The error message should appear directly under the input field.

- **Actual Behavior:**  
  The error message appears within the form, but not directly under the email input field.

## 4. **Attachment**

- Path to screenshot:
  `cypress/img/email_informal_message_1.png`
  `cypress/img/email_informal_message_2.png`
