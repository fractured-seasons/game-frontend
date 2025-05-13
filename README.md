# Fractured Seasons Website Frontend

This repository contains the React-based frontend for the Fractured Seasons website. It delivers the user interface for authentication, community forum, wiki, support ticketing, and update feeds, built with modern web technologies.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Prerequisites](#prerequisites)
* [Project Setup](#project-setup)
* [Configuration](#configuration)
* [Available Scripts](#available-scripts)
* [Project Structure](#project-structure)
* [Styling Guidelines](#styling-guidelines)
* [Testing](#testing)
* [Deployment](#deployment)
* [Contributing](#contributing)

---

## Features

* Responsive UI built with React and Tailwind CSS
* Client-side routing using React Router
* State management with Redux Toolkit and React Query
* Secure authentication flows (JWT, OAuth2)
* Rich text editor for forum posts and wiki contributions
* Real-time notifications for support tickets and updates
* Theming support (light/dark mode)
* Accessibility best practices (WCAG 2.1 AA)

## Tech Stack

* **Framework**: React 18
* **Language**: TypeScript
* **Styling**: Tailwind CSS, Headless UI
* **Routing**: React Router DOM
* **Forms & Validation**: React Hook Form, Yup
* **Build Tool**: Vite
* **Testing**: Jest, React Testing Library

## Prerequisites

* Node.js 16+
* npm 8+ or Yarn 1.22+

## Project Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/fractured-seasons-frontend.git
   cd fractured-seasons-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

## Configuration

Create a `.env.local` file in the project root with the following variables:

```env
VITE_APP_API_URL=http://localhost:8080/api
```

## Available Scripts

In the project directory, you can run:

| Script            | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start development server (localhost:5173) |
| `npm run build`   | Build for production (output to `/dist`)  |
| `npm run preview` | Preview production build locally          |
| `npm run test`    | Run unit and integration tests            |
| `npm run lint`    | Lint code with ESLint                     |
| `npm run format`  | Format code with Prettier                 |

## Project Structure

```
src/
├── assets/            # Images, fonts, icons
├── components/        # Reusable UI components
├── features/          # Redux slices and React Query hooks
├── layouts/           # Page layout components
├── pages/             # Route-based pages
├── routes/            # Route definitions
├── services/          # API client and utility functions
├── styles/            # Tailwind config and global styles
└── utils/             # Helper functions and types
```

## Styling Guidelines

* Use Tailwind utility classes for styling.
* Leverage Headless UI components for accessible UI patterns.
* Prefer function-based CSS classes over custom CSS.
* Maintain BEM-like naming for any custom CSS modules.

## Testing

* Write unit tests with Jest and React Testing Library.
* Aim for 80%+ coverage in critical components and services.
* Run tests in watch mode during development:

  ```bash
  npm run test -- --watch
  ```

## Deployment

* The production build is optimized and output to the `dist/` folder.
* Deploy via static hosts like Vercel, Netlify, or serve with a Node/Express server.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m "feat: description"`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.