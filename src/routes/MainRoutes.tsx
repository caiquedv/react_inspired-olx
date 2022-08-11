import React from 'react';

import { RequireAuth } from '../helpers/RequireAuth';

import { Route, Routes } from 'react-router-dom';
import { Home } from "../pages/Home/Home";
import { About } from "../pages/About/About";
import { NotFound } from '../pages/NotFound/NotFound';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';
import { AdPage } from '../pages/AdPage/AdPage';
import { AddAd } from '../pages/AddAd/AddAd';
import { Ads } from '../pages/Ads/Ads';

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/ad/:id" element={<AdPage />} />
      <Route path="/post-an-ad" element={
        <RequireAuth>
          <AddAd />
        </RequireAuth>
      } />
      <Route path="/ads" element={<Ads />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
} 