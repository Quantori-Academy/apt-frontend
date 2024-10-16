# Frontend Documentation

## Overview

This project is designed to manage users, reagents, samples, requests, orders, storage locations within a laboratory setting. It supports various user roles, each with distinct functionalities. The frontend is built using React and Redux Toolkit for state management, along with MUI for the UI components and RTK Query for data fetching and caching.

## Table of Contents
- [Getting Started](#getting-started)
- [Tools and Technologies](#tools-and-technologies)
- [Diagrams](#diagrams)

## Getting Started

1. Clone the repo to your local machine.
2. Make sure you have Node.js >= 20 and NPM >= 10 installed globally.
3. Install all necessary dependencies via `npm ci` command.
4. Create `.env.local` file using `.env.example` as an example.

### Local environment (frontend)

| command | description |
| ------ | ------ |
|`npm run dev`| to run local dev server. Dev server is setup to use 3000 port.|
|`npm run build`| to build a bundle.|
|`npm run preview`| to start the bundled app you have built.|
|`npm run typecheck`| to check types via Typescript compiler.|
|`npm run lint`| to run linter check.|
|`npm run lint:fix`| to fix reported problems automatically where possible.|
|`npm run stylelint`| to run linter check for stylesheets.|
|`npm run stylelint:fix`| to fix problems in stylesheets automatically where possible.|

### Local environment (backend)

To run backend app locally:
1. Clone this repo: [link](https://github.com/Quantori-Academy/apt-backend)
2. Follow the steps: [link](https://github.com/Quantori-Academy/apt-backend/blob/main/README.md)

## Tools and Technologies

This project utilizes the following tools and libraries:

- **React** for building the user interface.
- **Redux Toolkit** for state management and handling asynchronous logic.
- **RTK Query** for data fetching and caching.
- **React Router** for handling navigation and protected routes.
- **TypeScript** for static typing.
- **MUI** for building responsive, accessible, and modern UI components.
- **Vite** for fast builds and hot module replacement during development.

## Diagrams

Refer to the `diagrams/` folder for visual representations of the project. Diagrams include:

- **Role-Based Permissions**: Displays what each user role (Administrator, Procurement Officer, Researcher) can do in relation to user management, reagent management, and other features.
- **Database Diagram**: Visualizes the database structure and relationships between entities.
- **Business Entities Diagram**: Represents the core business entities and their relationships within the system.
