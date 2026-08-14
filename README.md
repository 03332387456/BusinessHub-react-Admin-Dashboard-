# BusinessHub

BusinessHub is a React-based business administration dashboard for managing products, customers, and orders from a single interface.

This project was built as a frontend practice project to strengthen React, JavaScript, React Router, Bootstrap, CSS, LocalStorage, API-style data loading, CRUD operations, filtering, and reusable UI patterns.

## Live Demo

Add your Vercel URL here after deployment:

`https://your-businesshub-project.vercel.app`

## GitHub Repository

Add your GitHub repository URL here:

`https://github.com/your-username/businesshub-react-admin-dashboard`

## Features

### Dashboard
- Total product count
- Total customer count
- Total order count
- Recent orders
- LocalStorage-backed statistics

### Products
- View products
- Search and filter products
- Add products
- Edit products
- Delete products
- View product details
- LocalStorage persistence

### Customers
- Customer list
- Search customers
- Filter by status
- View customer details
- Initial JSON data
- LocalStorage persistence

### Orders
- Order list
- Search orders by customer
- Filter by status
- View order details
- Display ordered products
- Calculate product subtotals
- Display order totals
- Initial JSON data
- LocalStorage persistence

### Settings
- Edit admin profile
- Store profile data in LocalStorage
- Display saved profile data in the sidebar
- Email notification preference UI
- Order notification preference UI

### Other
- Loading states
- Error states
- Empty-result handling
- Custom 404 page
- Responsive UI

## Technologies

- React
- JavaScript ES6+
- React Router
- Bootstrap
- CSS3
- Axios
- LocalStorage API
- JSON
- Vite

## Data Flow

The current version is intentionally frontend-only.

Initial data comes from JSON files and is then stored in browser LocalStorage.

```text
JSON files
   ↓
React application
   ↓
LocalStorage
   ↓
CRUD / Search / Filter / Display
```

Main LocalStorage keys:

```text
Products
Customers
Orders
Settings
```

Each browser has its own LocalStorage, so this is not yet a multi-user backend system.

## CRUD

### Products

| Operation | Status |
|---|---|
| Create | Complete |
| Read | Complete |
| Update | Complete |
| Delete | Complete |

### Customers

| Operation | Status |
|---|---|
| Create | Not in current scope |
| Read | Complete |
| Update | Not in current scope |
| Delete | Not in current scope |

### Orders

| Operation | Status |
|---|---|
| Create from cart | Not implemented |
| Read | Complete |
| Update | Not in current scope |
| Delete | Not in current scope |

Orders currently come from JSON data. In a real shopping application, an order would normally be created through a backend after checkout.

## Routing

Main routes include:

```text
/
/Products
/Products/:id
/Products/Add
/Products/Edit/:id
/Customers
/Customers/:id
/Orders
/Orders/:id
/Settings
```

Unknown routes are handled by a custom 404 page.

## Vercel Routing

Because React Router is used, the project contains a `vercel.json` file so direct visits to routes such as `/Products`, `/Customers`, and `/Orders` are handled by the React application.

The file contains:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Run Locally

Clone the repository:

```bash
git clone https://github.com/your-username/businesshub-react-admin-dashboard.git
```

Enter the project:

```bash
cd businesshub-react-admin-dashboard
```

Install dependencies:

```bash
npm install
```

Start development:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

The intended deployment setup is GitHub + Vercel:

```text
Local Project
     ↓
Git
     ↓
GitHub
     ↓
Vercel
     ↓
Live Website
```

After connecting the GitHub repository to Vercel, new pushes can trigger new deployments.

## Current Architecture

This project does not currently include:

- Node.js backend
- Express API
- MongoDB
- Authentication
- Real payment processing
- Real checkout
- Server-side validation
- Multi-user database storage

A future MERN version can replace LocalStorage with:

```text
React
   ↓
Express REST API
   ↓
Node.js
   ↓
MongoDB
```

## Learning Objectives

This project was built to practice:

- React components
- useState
- useEffect
- React Router
- URL parameters
- Controlled forms
- Event handling
- Array methods
- map()
- filter()
- find()
- reduce()
- Conditional rendering
- LocalStorage
- JSON parsing
- CRUD operations
- Search and filtering
- Loading and error states
- Responsive Bootstrap layouts
- CSS styling
- Axios data loading

## Future Improvements

- Node.js + Express backend
- MongoDB database
- REST APIs
- Authentication
- Real checkout
- Shopping cart
- Real order creation
- Pagination
- Sorting
- Dashboard analytics
- Role-based permissions
- Server-side validation

## Purpose

BusinessHub was built as a practical frontend project before moving into backend development.

The purpose was to understand how a complete React application is structured, how routing and state work together, how frontend data can be persisted with LocalStorage, and how the application can later be connected to a real backend.

## Author

Developed by **Ahsan** as a React and JavaScript practice project.
