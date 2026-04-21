# Product Store App

A React product store application built for **Week 7,8,9 Assignment** covering:
- Context API + useReducer
- Redux Toolkit
- React Query

## Features

### Context API + useReducer
- Theme toggle (`light / dark`)
- Product view mode (`grid / list`)
- Feed mode (`pagination / infinite scroll`)
- Shared settings without prop drilling

### Redux Toolkit (Cart)
- Add to cart
- Remove from cart
- Increase quantity
- Decrease quantity
- Clear cart
- Total items in navbar
- Total price in cart
- Cart persisted in `localStorage`

### React Query
- Product list fetched from API
- Product details page
- Loading and error states
- Query keys and cached data
- Pagination mode
- Infinite scroll mode
- Mutation example for submitting mock reviews

### Extra Features
- Search products
- Filter + sort products
- Cart notes (saved in `localStorage`)
- Recommended products in cart
- Toast for add-to-cart feedback
- Skeleton loading
- Responsive UI

## Tech Stack
- React
- React Router
- Context API + `useReducer`
- Redux Toolkit + React Redux
- TanStack React Query
- Axios
- Tailwind CSS
- Vite

## Project Structure
- `src/context` → app settings state (Context + reducer)
- `src/store` → Redux store and cart slice
- `src/services` → API calls
- `src/pages` → Home, ProductDetails, Cart
- `src/components` → reusable UI components
- `src/router` → app routes

## API
This project uses **DummyJSON Products API**:
- https://dummyjson.com/products

## Screenshots 


## How to run:
# 1) Install dependencies
npm install
# 2) Navigating to project folder
cd product-store
# 3) Run the Project
npm run dev


