# Next.js Auth Template

This project is a starter template for building applications with Next.js, Drizzle ORM, and Auth.js. It provides a solid foundation with authentication, database integration, and a clean project structure.

## Table of Contents

- [Description](#description)
- [Usage](#usage)
- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
  - [Neon Database](#neon-database)
  - [Google OAuth](#google-oauth)
  - [Email Provider](#email-provider)
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
git clone https://github.com/KVance1010/next-auth-drizzle-template
```

2. Navigate to the project directory:

```bash
cd next-auth-drizzle-template
```

3. Install dependencies:

```bash
npm install
```

4. Set up a Neon database:
   - see [Neon Database](#neon-database)

5. Set up Google OAuth:
   - see [Google OAuth](#google-oauth)

6. Set up email provider:
   - see [Email Provider](#email-provider)

7. Set up environment variables by creating a `.env` file in the root directory and adding the necessary variables, including the Neon database connection details.

8. Run seed:

```bash
npm run seed
```

9. Run the development server:

```bash
npm run dev
```

## Environment Variables

To configure the project, you need to set up the following environment variables in a `.env` file in the root directory:

### Neon Database

1. **Sign up on Neon**:
   - Go to the [Neon website](https://neon.tech/) and create an account using your email or preferred login method.

2. **Access the Neon Console**:
   - Log in to your Neon account and access the Neon Console.

3. **Create a New Project**:
   - Click "New Project" to start creating your database environment.

4. **Project Details**:
   - Provide a name for your project.
   - Select a desired region where you want your database to be hosted.

5. **Database Creation**:
   - Choose a Postgres version if prompted.
   - Enter a database name for your project.
   - Click "Create Project" to initiate the database setup.

6. **Access Connection Details**:
   - Once the project is created, you will see your connection string and other access details like username and password.
   - Additionally, you can find this with the "Connect" button at the top right of the screen when inside the project view.

7. **Add Connection String to `.env` File**:
   - Add the following line to your `.env` file:
     ```
     DATABASE_URL=your_neon_database_url
     ```

   If there are any errors, reference the [Neon docs](https://neon.tech/docs/manage/databases).

### Google OAuth

1. **Login to Google Cloud Console**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/getting-started) and log in with your Google account.

2. **Create a New Project**:
   - Click "Select a project".
   - Click "New project".
   - Provide a project name (this cannot be changed later).
   - Set the location (you can keep this as "No organization").
   - Click "Create" and wait for the project creation.
   - Click "Select Project" from the pop-up.

3. **Set Up OAuth Consent Screen**:
   - In the Google Cloud Console, go to APIs & Services > Credentials (found in the top left hamburger menu).
   - Click "OAuth consent screen".
   - Select the "External" radio button and click "Create".
   - Enter the app information:
     - App name.
     - Select your email from the dropdown.
     - (Optional) Add your app domains and verify them.
     - Developer contact info (used for Google to contact you about changes).
   - Click "Save and Continue".
   - Click "Add or Remove Scopes".
     - Select the first two options: "See your primary Google Account email address" and "See your personal info, including any personal info you've made publicly available".
     - Click "Update" and then "Save and Continue".
   - Click "Save and Continue" again.
   - Click "Back to Dashboard".

4. **Create OAuth Credentials**:
   - Go to "Credentials" in the sidebar menu.
   - Click "Create credentials" and select "OAuth client ID".
   - Select "Web application" as the application type.
   - Provide a name for the credential.
   - Under "Authorized redirect URIs", add:
     - For development: `http://localhost:3000/api/auth/callback/google`
     - For production: `<application_url>/api/auth/callback/google`
   - Click "Create".

5. **Add Client ID and Client Secret to `.env` File**:
   - Add the following lines to your `.env` file:
     ```
     AUTH_GOOGLE_ID=your_google_client_id
     AUTH_GOOGLE_SECRET=your_google_client_secret
     ```

   If there are any errors, reference the [Google Workspace docs](https://developers.google.com/workspace/guides/create-credentials).

### Email Provider

1. **Access Your Google Account**:
   - Start by visiting the [Google Account management page](https://myaccount.google.com/).
   - Sign in to the Google Account associated with the Gmail address you want to use for sending emails programmatically.

2. **Enable 2-Step Verification**:
   - In the left sidebar, click on “Security.”
   - Scroll down to "How you sign in to Google" and click on "2-Step Verification."
   - Follow the prompts to enable 2-Step Verification if it is not already enabled.

3. **Create an App Password**:
   - Scroll down to “App passwords.” Click on “App passwords.” You may be prompted to re-enter your password for security purposes.
   - Select "Mail" as the app and "Other" as the device.
   - Enter a custom name for this App Password (e.g., "Nodemailer").
   - Click the “Create” button. Google will create a unique 16-character App Password for your custom application/device.

4. **Add Email Configuration to `.env` File**:
   - Add the following lines to your `.env` file:
     ```
     MAILER_EMAIL=your_email_address
     MAILER_PASSWORD=your_app_password
     MAILER_SERVICE=gmail
     ```

   If you are using a different email provider, the setup will be slightly different. Check the list of [supported services](https://community.nodemailer.com/2-0-0-beta/setup-smtp/well-known-services/) to see what options you need to use in your `.env` file. For example:

   ```
   MAILER_EMAIL=your_email_address
   MAILER_PASSWORD=your_email_password
   MAILER_PORT=your_email_port
   MAILER_HOST=your_email_host
   ```

   If there are any errors, reference the [Nodemailer documentation](https://nodemailer.com/usage/using-gmail/).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Connect with me

- [GitHub](https://github.com/KVance1010)
- [LinkedIn](https://www.linkedin.com/in/kyle-s-vance/)
- [Website](https://vancewebdevelopment.com)
