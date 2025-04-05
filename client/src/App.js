import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './component/ProtectedRoute';
import Layout from './pages/Layout';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { CreateRecipe } from './pages/Createrecipe';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout />}>
      <Route path='' element = {<Home />}/>
      <Route path='login' element = {<Login />}/>
      <Route path='register' element = {<Register />} />
      <Route path='Createrecipe' element = {<CreateRecipe />} />
      
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;