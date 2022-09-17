import React, { useEffect, useState } from "react";
import { PageContainer } from "../../AppStyles";
import { PageArea, Fake, OthersArea, BreadCrumb } from "./styled";
import { AdItem } from "../../components/AdItem/AdItem";

import { OlxAPI } from "../../helpers/OlxAPI";
import { Link, useParams } from "react-router-dom";

import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";

export const AdPage = () => {
    const { id } = useParams();
    // console.log(useParams());
    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo]: any = useState({});

    useEffect(() => {
        const getAdInfo = async (id) => {
            const json = await OlxAPI.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id); 
    }, [id]);

    const formatDate = (date) => {
        let cDate = new Date(date);

        let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return `${cDay} de ${months[cMonth]} de ${cYear}`
    }

    return (
        <PageContainer>
            {adInfo.category &&
                <BreadCrumb>
                    Você está aqui:
                    <Link to="/react_inspired-olx">Home</Link>
                    /
                    <Link to={`/react_inspired-olx/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                    /
                    <Link to={`/react_inspired-olx/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                    / {adInfo.title}
                </BreadCrumb>
            }

            <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300} />}
                            {adInfo.images &&
                                <Slide>
                                    {adInfo.images.map((item, index) =>
                                        <div key={index} className="each-slide">
                                            <img src={item} alt="" />
                                        </div>
                                    )}
                                </Slide>
                            }
                        </div>
                        <div className="ad-Info">
                            <div className="adName">
                                {loading && <Fake height={20} />}
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated &&
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className="adDescription">
                                {loading && <Fake height={100} />}
                                {adInfo.description}
                                <hr /> 
                                {adInfo.views &&
                                    <small>Visualizações: {adInfo.views}</small>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="box box--padding">
                        {loading && <Fake height={20} />}
                        {adInfo.priceNegotiable &&
                            "Preço Negociável"
                        }
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className="price">Preço: <span>R$ {adInfo.price}</span></div>
                        }
                    </div>
                    {loading && <Fake height={50} />}
                    {adInfo.userInfo &&
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} target="_blank" className="contactSellerLink">Fale com o vendedor</a>
                            <div className="createdBy box box--padding">
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>E-mail: {adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.stateName}</small>
                            </div>
                        </>
                    }
                </div>
            </PageArea>
            <OthersArea>
                {adInfo.others &&
                    <>
                        <h2>Outras ofertas do vendedor</h2>
                        <div className="list">
                            {adInfo.others.map((item, index) =>
                                <AdItem key={index} data={item} />
                            )}
                        </div>
                    </>
                }
            </OthersArea>
        </PageContainer>
    );
}