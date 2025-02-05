# Next.js Auth Template

This project is a starter template for building applications with Next.js, Drizzle ORM, and Auth.js. It provides a solid foundation with authentication, database integration, and a clean project structure.

## Table of Contents

- [Description](#description)
- [Usage](#usage)
- [Technologies](#technologies)
- [Installation](#installation)
- [License](#license)
- [Connect](#connect-with-me)

## Description

This template is designed to help you quickly set up a new project with Next.js, Drizzle ORM, and Auth.js. It includes essential configurations and scripts to get you started with development, building, and deploying your application. The template is designed with minimal client-side code and uses Tailwind CSS as the primary CSS framework. It ensures that your boilerplate code is set up, so you don't have to worry about database configurations, file structure, ESLint rules, and auto-formatting with Prettier and ESLint. Additionally, it leverages middleware for fast and secure routing.

### Features

- **Next.js v15**: A React framework that enables server-side rendering and static site generation.
- **Drizzle ORM**: A lightweight TypeScript ORM for SQL databases, providing a simple and type-safe way to interact with your database.
- **Auth.js v5**: A flexible authentication library for handling user authentication and authorization.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **Nodemailer**: A module for Node.js applications to send emails easily.
- **React Hook Form**: A library for managing form state and validation in React applications.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **ESLint**: A tool for identifying and fixing problems in JavaScript code.
- **Prettier**: An opinionated code formatter.
- **Middleware**: Utilized for fast and secure routing, ensuring that requests are handled efficiently and securely.

### Project Structure

The project follows a clean and modular structure, making it easy to scale and maintain. Key directories and files include:

- `app/`: Contains the Next.js apis and pages for routing.
- `components/`: Reusable React components.
- `db/`: Database configuration and migration files.
- `utils/`: Utility functions and helpers.
- `styles/`: Global and component-specific styles.
- `actions/`: Server actions for handling business logic and API requests.
- `email-templates/`: Nodemailer email templates for sending emails.
- `validation-schemas/`: Zod schemas for validating data, including environment variables.

## Usage

To start the development server, run:

```bash
npm run dev
```

To build the project, run:

```bash
npm run build
```

To start the production server, run:

```bash
npm start
```

To run database migrations, use:

```bash
npm run migrate
```

## Technologies

- [Next.js](https://nextjs.org/)
- [Drizzle ORM](https://drizzle.team/)
- [Auth.js](https://authjs.dev/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Nodemailer](https://nodemailer.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/next-auth-template.git
```

2. Navigate to the project directory:

```bash
cd next-auth-template
```

3. Install dependencies:

```bash
npm install
```

4. Set up a Neon database:
   - Create an account at [Neon](https://neon.tech/)
   - Create a new project and database
   - Note the connection details (host, database name, user, password)

5. Set up environment variables by creating a `.env` file in the root directory and adding the necessary variables, including the Neon database connection details.

6. Run the development server:

```bash
npm run dev
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Connect with me

- [GitHub](https://github.com/KVance1010)
- [LinkedIn](https://www.linkedin.com/in/kyle-s-vance/)
- [Website](https://vancewebdevelopment.com)
