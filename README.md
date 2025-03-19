# Memberstack Cypress Testing Assessment

## Overview

This is a testing assessment for Cypress QA Engineer candidates at Memberstack. The application is a simple user management system that allows you to create, read, update, and delete user records.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone this repository

```bash
git clone [repository-url]
cd memberstack-cypress-assessment
```

2. Install dependencies

```bash
npm install
```

3. Start the application

```bash
npm start
```

The application will be available at http://localhost:3000

4. Open Cypress

```bash
npm run cypress:open
```

## Project Structure

```
├── public/               # Static files
├── src/                  # React application source
│   ├── App.jsx           # Main application component
│   ├── App.css           # Application styling
│   ├── UserForm.jsx      # User management component
│   ├── UserForm.css      # Component styling
│   └── index.js          # Application entry point
├── cypress/              # Cypress tests
│   ├── e2e/              # End-to-end tests
│   │   └── userForm.sample.cy.js  # Sample test file
│   ├── fixtures/         # Test data
│   └── support/          # Support files
└── package.json          # Project configuration
```

## Assessment Instructions

Please refer to the `INSTRUCTIONS.md` file for detailed information about the assessment requirements, deliverables, and evaluation criteria.

## Technologies Used

- React 19
- Cypress 14
- Testing Library/Cypress

## Contact

If you encounter any technical issues with the assessment environment, please contact the Memberstack hiring team.

Good luck!
