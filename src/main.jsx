import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { UsersProvider } from './context/UsersContext.jsx'
import {ProductsProvider} from './context/ProductsContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <ProductsProvider>
  <UsersProvider>
    <App />
  </UsersProvider>
  </ProductsProvider>
)
