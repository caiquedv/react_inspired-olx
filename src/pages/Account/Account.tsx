import React, { useEffect, useState } from "react"

import Cookies from 'js-cookie';
import { OlxAPI } from "../../helpers/OlxAPI";

import { PageTitle } from "../../AppStyles";
import { UserDataForm } from "../../components/AccountForms/UserDataForm/UserDataForm";
import { MyAccContainer } from "./styled";
import { UserAdsForm } from "../../components/AccountForms/UserAdsForm/UserAdsForm";

export const Account = () => {
    const [userJson, setUserJson] = useState();

    useEffect(() => {
        const getUserInfo = async () => {
            const json = await OlxAPI.getUserData(Cookies.get('token'));
            setUserJson(json);
            
        };
        getUserInfo();
        // console.log(typeof(userJson));
    }, []);

    return (
        <MyAccContainer>

            <div className="personalArea">
                <PageTitle>Dados Pessoais</PageTitle>
                <UserDataForm userData={userJson} />
            </div>


            <div className="AdsArea">
                <h2>Meus Anúncios</h2>
                <UserAdsForm userData={userJson} />
            </div>

        </MyAccContainer>

    );
} 