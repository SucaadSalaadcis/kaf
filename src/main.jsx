import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router-dom"
import router from '../src/routers/Router.jsx'

import { ToastContainer } from 'react-toastify';

import AuthProvider from './contexts/AuthProvider.jsx'

// tanckstack
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      
      {/* Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>

    </AuthProvider>
  </>
)
