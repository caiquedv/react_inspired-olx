import React, { useEffect } from "react";
import { PageContainer, PageTitle, ErrorMessage } from "../../AppStyles";
import { PageArea } from "./styled";

import { useState } from "react";

import { OlxAPI } from "../../helpers/OlxAPI";
import { doLogin } from "../../helpers/AuthHandler";

//suporte@b7web.com.br 12345

export const SignUp = () => {
    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const [stateList, setStateList] = useState([]);

    useEffect(()=>{
        const getStates = async () => {
            const slist = await OlxAPI.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        if(password !== confirmPassword) {
            setError('Senhas não batem');
            setDisabled(false);
            return;
        }

        const json = await OlxAPI.register(name, email, password, stateLoc);

        if (json.error) {
            setError(json.error);
        } else {
            doLogin(json.token);
            window.location.href = '/';
        }
        setDisabled(false);
    }

    return (
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fullName" className="area">
                        <div className="area--title">Nome Completo</div>
                        <div className="area--input">
                            <input type="text" name="fullName" id="fullName"
                                disabled={disabled}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label htmlFor="stateLoc" className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select name="stateLoc" id="stateLoc" 
                                value={stateLoc} 
                                onChange={e=>setStateLoc(e.target.value)}
                                required
                            >
                                <option></option>
                                {stateList.map((item: any, index)=>
                                    <option key={index} value={item.id}>{item.name}</option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label htmlFor="email" className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input type="email" name="email" id="email"
                                disabled={disabled}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
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
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label htmlFor="confirmPass" className="area">
                        <div className="area--title">Confirmar Senha</div>
                        <div className="area--input">
                            <input type="password" name="confirmPass" id="confirmPass"
                                disabled={disabled}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label htmlFor="submit" className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button id="submit" name="submit" disabled={disabled}>Fazer Cadastro</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}