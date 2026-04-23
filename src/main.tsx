import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { FormDataProvider } from './context/FormDataContext';
import App from './App';
import Step1PersonalData from './components/Step1PersonalData';
import Step2AddressWork from './components/Step2AddressWork';
import Step3LoanParams from './components/Step3LoanParams';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <FormDataProvider>
        <App />
      </FormDataProvider>
    ),
    children: [
      { index: true, element: <Navigate to="/step1" replace /> },
      { path: 'step1', element: <Step1PersonalData /> },
      { path: 'step2', element: <Step2AddressWork /> },
      { path: 'step3', element: <Step3LoanParams /> },
      { path: '*', element: <Navigate to="/step1" replace /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
