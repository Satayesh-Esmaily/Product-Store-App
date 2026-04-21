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
<img width="1920" height="1021" alt="image" src="https://github.com/user-attachments/assets/2e4172ab-209a-48d7-b857-969f1f044057" />
<img width="1920" height="1022" alt="image" src="https://github.com/user-attachments/assets/e443f3ab-bae1-4141-a099-9c2037d33377" />
<img width="1920" height="1010" alt="image" src="https://github.com/user-attachments/assets/d96db381-c556-4899-8c3c-6e167873f393" />
<img width="1918" height="1025" alt="image" src="https://github.com/user-attachments/assets/3cab4c2a-390c-47c5-9299-ccd9d6f9bf2b" />
<img width="1920" height="1029" alt="image" src="https://github.com/user-attachments/assets/3fd56cb5-dd26-4160-a44a-25330a39cc55" />
<img width="1920" height="1007" alt="image" src="https://github.com/user-attachments/assets/8bf8a7e6-3848-43b5-811d-d603f974b562" />


## How to run:
# 1) Navigating to project folder
cd product-store
# 2) Install dependencies
npm install
# 3) Run the Project
npm run dev


