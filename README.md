# Corserva App Frontend

This is the frontend of the Corserva application, developed with React, TypeScript, and Tailwind CSS. This application allows you to manage purchase orders through a simple and user-friendly interface.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Technologies Used](#technologies-used)
- [Testing](#testing)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/miguelcamargo9/corserva-app-fe.git
   ```

2. Navigate to the project directory:
    ```bash
    cd corserva-app-fe
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Environment Variables

This project uses environment variables to configure the API URL. Create a file named `.env.local` in the root of your project and add the following:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3002
```

This variable is used to configure the base URL for API requests.

## Usage
To start the application in development mode, use the following command:

```bash
npm start
```

The application will open at http://localhost:3000.

## Available Scripts
In the project directory, you can run the following scripts:

`npm start`
Starts the application in development mode. Open http://localhost:3000 to view it in the browser.

`npm test`
Runs tests using Jest.

`npm run build`
Builds the application for production in the build folder.

`npm run lint`
Runs the linter to check for code quality issues.

`npm run lint:fix`
Runs the linter and fixes any fixable issues automatically.

## Technologies Used
React  
TypeScript  
Tailwind CSS  
Jest  
React Testing Library  

## Testing
This project uses Jest and React Testing Library for testing. To run tests, use the following command:
```bash
npm test
```