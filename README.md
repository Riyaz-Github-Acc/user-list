# React User Management App

A Single Page Application (SPA) for user list management built with React, Redux, and TypeScript. This project implements full CRUD operations, authentication, and modern UI patterns.

## 🚀 Live Demo

**[Live Application URL]** - `https://user-list-two-puce.vercel.app`

## ✨ Features

- **User Authentication** - Secure login with token management stored in session storage
- **User Management** - Complete CRUD operations (Create, Read, Update, Delete)
- **Search & Filter** - Real-time client-side search by name
- **Pagination** - Client-side pagination for better performance
- **Multiple Views** - Toggle between List and Card view layouts
- **Responsive Design** - Mobile-first responsive UI
- **Form Validation** - Comprehensive form validation with error handling
- **Loading States** - Loading indicators for all async operations

## 🛠 Tech Stack

- **React** - UI library with hooks and functional components
- **TypeScript** - Static type checking
- **Redux with Redux Thunk** - State management with async actions
- **React Router** - Client-side routing
- **Ant Design** - UI component library
- **ESLint & Prettier** - Code linting and formatting
- **Jest & React Testing Library** - Testing framework

## 🚀 Getting Started

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/Riyaz-Github-Acc/user-list.git
    cd react-user-management
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**

    ```bash
    npm start
    ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/               # Page components
├── store/               # Redux store with thunks
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── hooks/               # Custom React hooks

```

## 🔌 API Integration

This application integrates with the [ReqRes API](https://reqres.in/) for user management operations.

### Default Login Credentials

```json
{
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
}
```

## 🧪 Testing

Tests included for:

- ✅ Login & Logout functionality

```bash
npm test
```

## 🎨 Code Quality

- **ESLint** - Code linting with React and TypeScript rules
- **Prettier** - Consistent code formatting
- **TypeScript** - Full type safety
- **Modern JavaScript** - ES6+ features and best practices

## 📱 Key Features

### Authentication

- Token-based authentication
- Stored in session storage
- Protected routes

### User Management

- Create, read, update, delete users
- Modal-based forms for create/edit
- Confirmation dialogs for delete operations

### UI/UX

- Loading spinners for async operations
- Real-time search functionality
- Pagination controls
- List and card view toggle
- Responsive design for all devices

## 🚀 Available Scripts

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Build for production

## 🔧 Deployment

The application is deployed at: **`https://user-list-two-puce.vercel.app`**

Build the application:

```bash
npm run build
```

## 👨‍💻 Author

**Riyaz S**

- Portfolio: https://riyazportfoliosite.netlify.app
- GitHub: https://github.com/Riyaz-Github-Acc?tab=repositories
- Email: riyazofficeid@gmail.com
- Phone: 8148192503

---

_This project demonstrates modern React development practices with Redux Thunk for state management, comprehensive CRUD operations, and clean code architecture._
