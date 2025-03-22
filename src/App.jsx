import * as React from 'react';
import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from './Theme';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HomePage from './pages/Homepage';
import ProductDetails from './pages/ProductDetails';
import UserDetails from './pages/UserDetails';
import AddUserForm from './components/AddUserForm';
import AddProductForm from './components/AddProductForm';


export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate(); // Now inside Router context
  const [mode, setMode] = useState('dark'); // Default theme mode
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const router = useMemo(() => ({
    pathname: window.location.pathname, // Get current URL
    searchParams: new URLSearchParams(),
    navigate: (path) => navigate(path), // Now properly updates React Router
  }), [navigate]);

  const NAVIGATION = [
    { kind: 'header', title: 'Main items' },
    { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon />, onClick: () => router.navigate('/dashboard') },
    { segment: 'users', title: 'Users', icon: <PeopleIcon />, onClick: () => router.navigate('/users') },
    { segment: 'products', title: 'Products', icon: <ShoppingBagIcon />, onClick: () => router.navigate('/products') },
    { kind: 'divider' },
    { kind: 'header', title: 'Admin' },
    { segment: 'add-user', title: 'Add User', icon: <PersonAddIcon />, onClick: () => router.navigate('/add-user') },
    { segment: 'add-product', title: 'Add Product', icon: <AddShoppingCartIcon />, onClick: () => router.navigate('/add-product') },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider 
        navigation={NAVIGATION} 
        router={router}       
        branding={{
          logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
          title: 'JP',
          homeUrl: '/dashboard',
        }}
      >
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/add-user" element={<AddUserForm />} />
            <Route path="/add-product" element={<AddProductForm/> } />
          </Routes>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}
