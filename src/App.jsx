import React from 'react';

import { MainRoutes } from "./routes/MainRoutes";

import './App.css'
import {Template} from './AppStyles';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
      <Template>
        <Header />
        <MainRoutes />
        <Footer />
      </Template>

  )
}

export default App
