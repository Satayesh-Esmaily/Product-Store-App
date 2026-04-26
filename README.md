# Product Store App

    A React product store application built for **Week 7,8,9 Assignment** covering:
      - Context API + useReducer
      - Redux Toolkit
      - React Query

      
# Demo Video Link:
 https://youtu.be/0dzvvd2IlTs?si=0F3MRGqtCuhswcgd

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
## Home Page 
<img width="1920" height="1026" alt="image" src="https://github.com/user-attachments/assets/8a997f44-b053-4ae1-938c-ab10d805e544" />


## Cart Page
<img width="1920" height="1023" alt="image" src="https://github.com/user-attachments/assets/615fa12b-9b8b-4551-8cdc-999295028212" />


## Product Detail
<img width="1920" height="1021" alt="image" src="https://github.com/user-attachments/assets/a03b5291-704c-4056-93e6-437fbc16b91a" />


## Light Mode
<img width="1920" height="1010" alt="image" src="https://github.com/user-attachments/assets/d86beb7f-c1ab-48cf-9223-ff5fdf1580a7" />


## Mobile View
## Home Page
<img width="317" height="717" alt="image" src="https://github.com/user-attachments/assets/0b00f697-eeda-44fd-a223-48cb081017ba" />


## Cart Page
<img width="316" height="702" alt="image" src="https://github.com/user-attachments/assets/4d471d97-a624-43c6-8017-eace9a463da3" />


## Product Detail
<img width="321" height="699" alt="image" src="https://github.com/user-attachments/assets/01b94a1d-e793-42c9-8ef5-729eae45430f" />





## How to run:

    1. Navigate to the Folder 
    cd product-store
    2. Install dependencies
    npm install (i)
    3. Run the Project
    npm run dev 
    and open the localhost on your browser

