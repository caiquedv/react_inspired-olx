import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { Home } from "../pages/Home/Home";
import { About } from "../pages/About/About";
import { NotFound } from '../pages/NotFound/NotFound';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';
import { AdPage } from '../pages/AdPage/AdPage';

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/ad/:id" element={<AdPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
} 