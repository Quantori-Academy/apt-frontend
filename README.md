# Frontend Documentation

## Overview

This project is designed to manage users, reagents, samples, requests, orders, storage locations within a laboratory setting. It supports various user roles, each with distinct functionalities. The frontend is built using React and Redux Toolkit for state management, along with MUI for the UI components and RTK Query for data fetching and caching.

## Table of Contents
- [Getting Started](#getting-started)
- [Tools and Technologies](#tools-and-technologies)
- [Project Structure](#project-structure)
- [Routes](#routes)
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

## Project Structure

- `src/`: Contains the source code for the application.
  - `pages/`: Contains the components for individual pages like `Login`, `Dashboard`, `Users`, `AccountSettings` etc.
  - `components/`: Contains UI components such.
  - `router/`: Manages routing logic for the application, including protected and public routes.
  - `hooks/`: Contains custom React hooks.
  - `api/`: Holds the API service files.
  - `utils/`: Utility functions and helper methods to simplify common tasks.
  - `store/`: Contains Redux slices, store configuration, and `api.ts` for RTK Query requests.
  - `constants/`: Contains reusable constant values such as `userRoles`.
  - `types/`: Holds TypeScript type definitions for various data structures in the project.
  - `assets/`: Stores static assets like images or icons used in the UI.
- `diagrams/`: Contains project diagrams that illustrate the application’s architecture, state flow, and routing.

## Routes

The app uses React Router to manage navigation. Some routes are protected based on user roles

- `/login`: Public route for user authentication.
- `/dashboard`: Protected route, accessible after login.
- `/users/`: Accessible only by administrators to manage users.
- `/users/:id`: Accessible only by administrators to view or edit a specific user's details.
- `/account-settings`: Accessible by all users to manage their own profile.
- `/storages`: Page for searching and managing storage locations for reagents.

## Diagrams

Refer to the `diagrams/` folder for visual representations of the project. Diagrams include:

- **Role-Based Permissions**: Displays what each user role (Administrator, Procurement Officer, Researcher) can do in relation to user management, reagent management, and other features.
- **Database Diagram**: Visualizes the database structure and relationships between entities.
- **Business Entities Diagram**: Represents the core business entities and their relationships within the system.




















### Prerequisites

1. Cone the repo to your local machine.
2. Make sure you have Node.js >= 20 and NPM >= 10 installed globally.
3. Install all necessary dependencies via `npm ci` command.
4. Create `.env.local` file using `.env.example` as an example.

***Optional but highly recommended***. Install VSCode extensions that are listed in `.vscode/extensions.json`.

### Local environment (frontend)

While development use the following commands:

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
