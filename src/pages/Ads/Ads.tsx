import React, { useEffect, useState } from "react";
import { PageContainer } from "../../AppStyles";
import { PageArea } from "./styled";
import { useLocation, useNavigate } from 'react-router-dom';

import { OlxAPI } from "../../helpers/OlxAPI";
import { AdItem } from "../../components/AdItem/AdItem";
let timer;

export const Ads = () => {
    const navigate = useNavigate();


    const useQueryString = () => {
        return new URLSearchParams(useLocation().search);
    };
    const query = useQueryString();

    const [q, setQ]: any = useState(query.get('q') != null ? query.get('q') : '');
    const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '');
    const [state, setState]: any = useState(query.get('state') != null ? query.get('state') : '');

    const [adsTotal, setAdsTotal] = useState(0);
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [resultOpacity, setResultOpacity] = useState(1);
    const [loading, setLoading] = useState(true);

    const getAdsList = async () => {
        setLoading(true);
        let offset = (currentPage - 1) * 2;

        const json = await OlxAPI.getAds({
            sort: 'desc',
            limit: 2,
            q, 
            cat, 
            state,
            offset
        });
        setAdList(json.ads);
        setAdsTotal(json.total);
        setResultOpacity(1);
        setLoading(false);
    }

    useEffect(() => {
        if (adList.length > 0) {
            setPageCount(Math.ceil(adsTotal / adList.length));
        } else {
            setPageCount(0);
        }
    }, [adsTotal]);

    useEffect(()=>{
        setResultOpacity(0.3);
        getAdsList();
    }, [currentPage]);

    useEffect(() => {
        let queryString: any = []

        if (q) {
            queryString.push(`q=${q}`)
        }
        if (cat) {
            queryString.push(`cat=${cat}`)
        }
        if (state) {
            queryString.push(`state=${state}`)
        }

        navigate(`?${queryString.join('&')}`, { replace: true });

        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(getAdsList, 2000);
        setResultOpacity(0.3);
        setCurrentPage(1);
    }, [q, cat, state]);

    useEffect(() => {
        const getStates = async () => {
            const slist = await OlxAPI.getStates();
            setStateList(slist);
        };
        getStates();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await OlxAPI.getCategories();
            setCategories(cats);
        };
        getCategories();
    }, []);

    let pagination: number[] = [];
    for (let i = 1; i <= pageCount; i++) {
        pagination.push(i);
    }

    return (
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form method="GET">
                        <input type="text" name="q"
                            placeholder="O que você procura?"
                            value={q}
                            onChange={e => setQ(e.target.value)}
                        />

                        <div className="filterName">Estado: </div>
                        <select name="state" value={state} onChange={e => setState(e.target.value)}>
                            <option></option>
                            {stateList.map((item: any, index) =>
                                <option key={index} value={item.name}>{item.name}</option>
                            )}
                        </select>

                        <div className="filterName">Categoria: </div>
                        <ul>
                            {categories.map((item: any, index) =>
                                <li key={index}
                                    className={cat == item.slug ? 'categoryItem active' : 'categoryItem'}
                                    onClick={cat != item.slug ? () => setCat(item.slug) : () => setCat('')}
                                >
                                    <img src={item.img} alt="" />
                                    <span>{item.name}</span>
                                </li>
                            )}
                        </ul>
                    </form>
                </div>
                <div className="rightSide">
                    <h2>Resultados</h2>

                    {loading && adList.length === 0 &&
                        <div className="listWarning">Carregando...</div>
                    }
                    {!loading && adList.length === 0 &&
                        <div className="listWarning">Não encontramos resultados</div>
                    }

                    <div className="list" style={{ opacity: resultOpacity }}>
                        {adList.map((item, index) =>
                            <AdItem key={index} data={item} />
                        )}
                    </div>

                    <div className="pagination">
                        {pagination.map((item, index) =>
                            <div key={index}
                                onClick={()=> setCurrentPage(item)}
                                className={item === currentPage ? 'pagItem active' : 'pagItem'}
                            >{item}</div>
                        )}
                    </div>

                </div>
            </PageArea>
        </PageContainer>
    );
}