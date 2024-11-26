# RBAC UI

This is the Role-Based Access Control (RBAC) User Interface for managing permissions and roles. It provides an intuitive interface for administrators to control user access levels and permissions.

## Features

- **User Management**: Add, edit, and remove users.
- **Role Management**: Create and assign roles to users.
- **Permission Configuration**: Define permissions for each role.
- **Dashboard**: View summaries of user activities and access levels.

## Prerequisites

- **Node.js** 16.x or later
- **npm** 7.x or later

## Installation

1. **Clone the repository**:

  ```bash
  git clone https://github.com/mustafaazad03/rbac-ui.git
  cd rbac-ui
  ```

2. **Install dependencies**:

  ```bash
  npm install
  ```

## Development

Run the development server:

```bash
npm run dev
```

Access the application at `http://localhost:3000`.

## Building for Production

To build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application.
- `npm start`: Run the production server.
- `npm run lint`: Lint the codebase.

## Technologies Used

- **Next.js** 15.0.3
- **React** 19.x
- **TypeScript** 5.x
- **Tailwind CSS** 3.4.1

## Project Structure

- `src/` - Source code
  - `app/` - Application pages
  - `components/` - Reusable components
  - `context/` - Context providers
  - `data/` - Static data files
  - `ui/` - UI components
  - `utils/` - Utility functions
  - `types/` - Common components and hooks
  - `constant/` - Constants

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## Contact

For questions or support, please contact:

- Mustafa Azad - [mustafaazad533@gmail.com](mailto:mustafaazad533@gmail.com)
- GitHub: [mustafaazad03](https://github.com/mustafaazad03)