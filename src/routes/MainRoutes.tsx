import React from 'react';

import { RequireAuth } from '../helpers/RequireAuth';

import { Route, Routes } from 'react-router-dom';
import { Home } from "../pages/Home/Home";
import { NotFound } from '../pages/NotFound/NotFound';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';
import { AdPage } from '../pages/AdPage/AdPage';
import { AddAd } from '../pages/AddAd/AddAd';
import { Ads } from '../pages/Ads/Ads';
import { Account } from '../pages/Account/Account';

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/react_inspired-olx" element={<Home />} />
      <Route path="/react_inspired-olx/signin" element={<SignIn />} />
      <Route path="/react_inspired-olx/signup" element={<SignUp />} />
      <Route path="/react_inspired-olx/ad/:id" element={<AdPage />} />
      <Route path="/react_inspired-olx/post-an-ad" element={
        <RequireAuth>
          <AddAd />
        </RequireAuth>
      } />
      <Route path="/react_inspired-olx/ads" element={<Ads />} />
      <Route path="/react_inspired-olx/my-account" element={
        <RequireAuth>
          <Account />
        </RequireAuth>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
} 