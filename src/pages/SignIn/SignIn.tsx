import React from "react";
import { PageContainer, PageTitle, ErrorMessage } from "../../AppStyles";
import { PageArea } from "./styled";

import { useState } from "react";

import { OlxAPI } from "../../helpers/OlxAPI";
import { doLogin } from "../../helpers/AuthHandler";

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        const json = await OlxAPI.login(email, password);
        // console.log(json)

        if(json.error) {
            setError(json.error);
        } else {
            doLogin(json.token, rememberPassword);
            window.location.href = '/react_inspired-olx';
        }
        setDisabled(false);        
    }

    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input type="email" name="email" id="email" 
                                disabled={disabled}
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label htmlFor="password" className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input type="password" name="password" id="password" 
                                disabled={disabled}
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label htmlFor="remember" className="area">
                        <div className="area--title">Lembrar Senha</div>
                        <div className="area--input">
                            <input type="checkbox" name="remember" id="remember" 
                                disabled={disabled} 
                                checked={rememberPassword}
                                onChange={()=>setRememberPassword(!rememberPassword)}
                            />
                        </div>
                    </label>
                    <label htmlFor="submit" className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button  id="submit" name="submit" disabled={disabled}>Fazer Login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}