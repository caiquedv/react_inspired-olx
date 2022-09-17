import { HeaderArea } from "./styled";
import { Link } from 'react-router-dom'

import React, { useEffect, useState } from "react";
import { isLogged, doLogout } from "../../helpers/AuthHandler";

export const Header = () => {
    let logged = isLogged();

    const handleLogout = () => {
        doLogout();
        window.location.href = '/react_inspired-olx';
    }
    // console.log(window.location.pathname)

    const [location, setLocation] = useState('');

    useEffect(()=>{
        const getLocation = (x) => {
            setLocation(x);
        }
        getLocation(window.location.pathname);
        
    }, [window.localStorage]);
    

    return (
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to='/react_inspired-olx'>
                        <span className="logo-1">O</span>
                        <span className="logo-2">L</span>
                        <span className="logo-3">X</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {logged &&
                            <>
                                <li>
                                    <Link to="/react_inspired-olx/my-account">Minha Conta</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Sair</button>
                                </li>
                                <li>
                                    <Link to="/react_inspired-olx/post-an-ad" className="button">Poste um anúncio</Link>
                                </li>
                            </>
                        }
                        {!logged &&
                            <>
                                <li>
                                    <Link to="/react_inspired-olx/signin">Login</Link>
                                </li>
                                <li>
                                    <Link to="/react_inspired-olx/signup">Cadastrar</Link>
                                </li>
                                <li>
                                    <Link to="/react_inspired-olx/signin" className="button">Poste um anúncio</Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    );
};