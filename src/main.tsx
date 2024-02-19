import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './error-page';
import Homepage from './routes/Homepage';
import Product from './routes/Product';
import Pricing from './routes/Pricing';
import AppLayout from './routes/AppLayout';
import Login from './routes/Login';
import CityList from './components/CityList';
import CountryList from './components/CountriesList';
import City from './components/City';
import Form from './components/Form';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: 'product',
        element: <Product />,
      },
      {
        path: 'pricing',
        element: <Pricing />,
      },
      {
        path: 'app',
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <CityList />,
          },
          {
            path: 'cities',
            element: <CityList />,
          },
          {
            path: 'cities/:id',
            element: <City />,
          },
          {
            path: 'countries',
            element: <CountryList />,
          },
          {
            path: 'form',
            element: <Form />,
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
