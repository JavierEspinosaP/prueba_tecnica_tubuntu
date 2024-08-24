# Prueba Técnica Tubuntu

This project is a technical test built with React, TypeScript, and Tailwind CSS. It leverages Vite for fast development and includes testing capabilities using Vitest. The project is designed to be modular and easy to maintain, with a focus on performance and modern development practices.

## Deployment

You can view the deployed application at the following link:

[https://prueba-tubuntu-javier-espinosa.netlify.app](https://prueba-tubuntu-javier-espinosa.netlify.app)

## Features

- **React**: A component-based approach to building user interfaces.
- **TypeScript**: Strong typing for safer and more predictable code.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Axios**: Promise-based HTTP client for making requests.
- **Vite**: A fast build tool that enhances the development experience.
- **Vitest**: A test runner for unit and component testing.

## Project Structure

The project is organized into the following key directories and files:

- **src/**: Contains the main source code.
  - **assets/**: Static assets like images and icons.
  - **components/**: Reusable React components.
    - **\_\_tests\_\_/**: Contains test files for components.
      - **UserList.test.tsx**: Tests for the `UserList` component.
    - **PhantomCards.tsx**: Component handling placeholder or loading states for user cards.
    - **UserList.tsx**: Component responsible for rendering a list of users.
  - **hooks/**: Custom hooks for specific functionalities.
    - **\_\_tests\_\_/**: Contains test files for hooks.
      - **useFetchUsers.test.ts**: Tests for the `useFetchUsers` hook.
    - **useFetchUsers.ts**: Custom hook to fetch user data from an API.
  - **interfaces/**: TypeScript interfaces used across the project.
    - **interfaces.ts**: Defines the data structures and types used throughout the application.
  - **App.css**: Global CSS styles for the application.
  - **App.test.tsx**: Tests for the `App` component.
  - **App.tsx**: Main entry point for the application.
  - **index.css**: Global styles for the application.
  - **main.tsx**: The main file that renders the React application to the DOM.
  - **setupTests.ts**: Configuration and setup for testing utilities.
  - **vite-env.d.ts**: TypeScript definitions for Vite.

- **public/**: Publicly accessible static files and assets.

- **tsconfig.json**: TypeScript configuration file.

- **package.json**: Project metadata and dependencies.

This structure is designed to keep the code modular and maintainable, with clear separation between components, hooks, interfaces, and tests.


## Prerequisites

- Node.js (>=16.0.0)
- npm (>=7.0.0) or yarn (>=1.22.0)

## Application Functionality

This application is a React-based project that fetches and displays user information using custom hooks and components. Below is an overview of the core functionality:

### Components

- **App.tsx**: 
  - The main entry point of the application. It uses the `useFetchUsers` custom hook to fetch user data and passes the fetched data as props to the `UserList` component. The `App.tsx` file is responsible for rendering the main layout, managing the fetched data, and handling any top-level state or context providers.

- **UserList.tsx**: 
  - This component is responsible for receiving and displaying a list of users passed to it via props from the `App` component. It maps over the provided user data and renders each user's information.

- **PhantomCards.tsx**: 
  - This component likely handles placeholder or loading states for the user cards. It is designed to improve the user experience by showing visual placeholders while the actual user data is being fetched.

### Custom Hooks

- **useFetchUsers.ts**: 
  - A custom hook designed to fetch user data from an API. It manages the state of the fetch request, including loading, success, and error states. The hook returns the user data along with loading and error states, which are then utilized by the `App.tsx` component to be passed down to `UserList.tsx`.


## Getting Started

1. **Clone the repository**:

   ``git clone https://github.com/JavierEspinosaP/prueba_tecnica_tubuntu.git``

   ``cd prueba_tecnica_tubuntu``

2. **Install dependencies**:

   ``pnpm install``

   or

   ``yarn install``

3. **Run the development server**:

   ``pnpm run dev``

   or

   ``yarn dev``

   This will start the application in development mode. You can access it at 
   
   ``http://localhost:5173``

4. **Build for production**:

   ``pnpm run build``

   or

   ``yarn build``

   This will create an optimized build of the application in the dist/ directory.

5. **Preview the production build**:

   ``pnpm run preview``

   or

   ``yarn preview``

   This will serve the production build locally to verify everything works as expected.

## Testing

- **Run tests**:

  ``pnpm test``

  or

  ``yarn test``

  This will run all unit and component tests using Vitest.

- **Run tests with UI**:

  ``pnpm run test:ui``

  or

  ``yarn test:ui``

  This will open a UI to run and debug tests interactively.

## Configuration

- **TypeScript**: The project is configured with strict settings to enforce best practices.
- **ESLint**: Linting is set up to ensure code quality and consistency.
- **Tailwind CSS**: Utility classes are used for styling, making it easy to build responsive designs.


## License

This project is licensed under the MIT License. See the LICENSE file for details.
