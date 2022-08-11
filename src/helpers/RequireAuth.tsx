import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogged } from './AuthHandler';

type Props = {
    children: JSX.Element
}

export const RequireAuth = ({children}: Props) => {
    const isAuth = isLogged();//verificação de login sempre retorna boolean

    if(!isAuth) {
        return <Navigate to='/signin' />;
    }
    
    return children;//tem um componente e o que tiver dentro dele vai ser renderizado
}