import React, { useEffect, useState } from "react";
import { ErrorMessage, PageTitle } from "../../AppStyles";
import { MyAccArea, PageArea } from "./styled";

import { OlxAPI } from "../../helpers/OlxAPI";

import Cookies from 'js-cookie';
import { AdItem } from "../../components/AdItem/AdItem";
import { OthersArea } from "../AdPage/styled";

export const Account = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userState, setUserState] = useState('');
    const [userPass, setUserPass] = useState('');

    const [userAds, setUserAds] = useState([]);

    const [disabledName, setDisabledName] = useState(true);
    const [disabledEmail, setDisabledEmail] = useState(true);
    const [disabledState, setDisabledState] = useState(true);
    const [disabledPass, setDisabledPass] = useState(true);

    const [nameBtn, setNameBtn] = useState('Alterar');
    const [emailBtn, setEmailBtn] = useState('Alterar');
    const [stateBtn, setStateBtn] = useState('Alterar');
    const [passBtn, setPassBtn] = useState('Alterar');

    const [stateList, setStateList] = useState([]);

    const [nameError, setNameError] = useState('');
    const [passError, setPassError] = useState('');
    const [emailError, setEmailError] = useState('');

    const submitHandler = async (e, btnValue, labelName) => {
        e.preventDefault();

        switch (labelName) {
            case 'name':
                if (btnValue === 'Alterar') {
                    setDisabledName(false);
                    setNameBtn('Salvar');
                } else if (userName.length < 4) {
                    setNameError('Mínimo 4 caracteres')
                } else {
                    setNameError('');
                    await OlxAPI.updateUser(userName, labelName);
                    setDisabledName(true)
                    setNameBtn('Alterar');
                }
                break;
            case 'email':
                if (btnValue === 'Alterar') {
                    setDisabledEmail(false)
                    setEmailBtn('Salvar');
                } else {
                    const response = await OlxAPI.updateUser(userEmail, labelName);
                    if (response.error) {
                        setEmailError(response.error);
                    } else {
                        setEmailError('');
                        setDisabledEmail(true)
                        setEmailBtn('Alterar');
                    }
                }
                break;
            case 'state':
                if (btnValue === 'Alterar') {
                    setDisabledState(false)
                    setStateBtn('Salvar');
                } else {
                    await OlxAPI.updateUser(userState, labelName);
                    setDisabledState(true)
                    setStateBtn('Alterar');
                }
                break;
            case 'pass':
                if (btnValue === 'Alterar') {
                    setDisabledPass(false)
                    setPassBtn('Salvar');
                } else if (userPass.length < 4) {
                    setPassError('Mínimo 4 caracteres');
                } else {
                    setPassError('');
                    await OlxAPI.updateUser(userPass, labelName);
                    setDisabledPass(true);
                    setPassBtn('Alterar');
                }
                break;
        }
    };

    useEffect(() => {
        const getUserInfo = async () => {
            const json = await OlxAPI.getUserData(Cookies.get('token'));

            setUserName(json.name);
            setUserEmail(json.email);
            setUserState(json.state);
            setUserAds(json.ads);

        };
        const getStates = async () => {
            const slist = await OlxAPI.getStates();
            setStateList(slist);
        };
        getStates();
        getUserInfo();

    }, []);

    return (
        <MyAccArea>
            <PageTitle>Dados Pessoais</PageTitle>
            <PageArea>
                <form>
                    <label className="area">
                        <div className="area--title">Nome: </div>
                        {nameError &&
                            <ErrorMessage>{nameError}</ErrorMessage>
                        }
                        <div className="area--input">
                            <input type="text"
                                value={userName}
                                required
                                onChange={(e) => setUserName(e.target.value)}
                                disabled={disabledName}
                            />
                            <button
                                onClick={e => submitHandler(e, e.currentTarget.innerText, 'name')}
                            >{nameBtn}</button>
                        </div>
                    </label> <hr />

                    <label className="area areaSelectBox">
                        <div className="area--title">Estado:</div>
                        <div className="area--input">
                            <select disabled={disabledState}
                                value={userState}
                                onChange={e => setUserState(e.target.value)}
                                required
                            >
                                {disabledState &&
                                    <option>{userState}</option>
                                }
                                {stateList.map((state: any, k) =>
                                    <option key={k} value={state.name}>{state.name}</option>
                                )}
                            </select>
                            <button
                                onClick={e => submitHandler(e, e.currentTarget.innerText, 'state')}
                            >{stateBtn}</button>
                        </div>
                    </label> <hr />

                    <label className="area">
                        <div className="area--title">Email:</div>
                        {emailError &&
                            <ErrorMessage>{emailError}</ErrorMessage>
                        }
                        <div className="area--input">
                            <input type="email"
                                value={userEmail || ''}
                                required
                                onChange={e => setUserEmail(e.target.value)}
                                disabled={disabledEmail}
                            />
                            <button
                                onClick={e => submitHandler(e, e.currentTarget.innerText, 'email')}
                            >{emailBtn}</button>
                        </div>
                    </label> <hr />

                    <label className="area">
                        <div className="area--title">Senha:</div>
                        {passError &&
                            <ErrorMessage>{passError}</ErrorMessage>
                        }
                        <div className="area--input">

                            <input type="password"
                                onChange={e => setUserPass(e.target.value)}
                                disabled={disabledPass}
                            />
                            <button
                                onClick={e => submitHandler(e, e.currentTarget.innerText, 'pass')}
                            >{passBtn}</button>
                        </div>
                    </label>
                </form>
            </PageArea>
            <OthersArea>
                <div className="userAds">
                    <h2>Meus Anúncios</h2>
                    <div className="list">
                        {userAds.map((item, index) =>
                            <AdItem key={index} data={item} />
                        )}
                    </div>
                </div>
            </OthersArea>
        </MyAccArea>
    );
}