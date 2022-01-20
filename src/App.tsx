import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from './pages/CreatePage';
import UserPage from './pages/UserPage';
import Menu from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';
import './styles.css'

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path="/" element={<CreatePage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
