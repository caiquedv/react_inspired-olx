import React from 'react';

import { useAppSelector } from './redux/hooks/useAppSelector'
import { setEmail } from './redux/reducers/userReducer';
import { useDispatch } from 'react-redux';

import { MainRoutes } from "./routes/MainRoutes";

import './App.css'
import {Template} from './AppStyles';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

function App() {
  const user = useAppSelector(state => state.user);
  const dispatch = useDispatch();

  // const handleNameInput = (e) => {
  //   dispatch(setEmail(e.target.value));
  // };

  return (
      <Template>
        <Header />
        <MainRoutes />
        <Footer />
      </Template>

  )
}

export default App
