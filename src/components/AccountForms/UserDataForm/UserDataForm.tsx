import React, { useEffect, useState } from "react";
import { ErrorMessage } from "../../../AppStyles";
import { Form } from "./styled";

import { OlxAPI } from "../../../helpers/OlxAPI";

export const UserDataForm = (userJson) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userState, setUserState] = useState('');
    const [userPass, setUserPass] = useState('');

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

    const submitHandler = async (e) => {
        e.preventDefault();
        const labelName = e.nativeEvent.submitter.id;
        const btnValue = e.nativeEvent.submitter.innerText;

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
        const getUserInfo = (json) => {
            try {
            setUserName(json.userData.name);
            setUserEmail(json.userData.email);
            setUserState(json.userData.state);
            } catch {}
        };

        const getStates = async () => { 
            const slist = await OlxAPI.getStates();
            setStateList(slist);
        };
        
        getUserInfo(userJson);
        getStates();
    }, [userJson]);
    
    return (
        <Form onSubmit={submitHandler}>
            <label className="area">
                <div className="area--title">Nome: </div>
                {nameError &&
                    <ErrorMessage>{nameError}</ErrorMessage>
                }
                <div className="area--input">
                    <input type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        disabled={disabledName}
                    />
                    <button id="name"
                        value={userName}
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
                    <button id='state'
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
                    <button id='email'
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
                    <button id='pass'
                    >{passBtn}</button>
                </div>
            </label>
        </Form>
    );
}