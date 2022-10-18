import React, { useEffect, useRef, useState } from "react";
import { OlxAPI } from "../../../helpers/OlxAPI";

import { AdItem } from "../../AdItem/AdItem";

import { AdsArea, CloseSpan, FormArea } from "./styled";

import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export const UserAdsForm = (userJson) => {
    const fileField: any = useRef();

    const [adId, setAdId] = useState('');
    const [adTitle, setAdTitle] = useState('');
    const [adStatus, setAdStatus] = useState(Boolean);
    const [adCategory, setAdCategory] = useState('');
    const [adSlugIdCategory, setAdSlugIdCategory] = useState(''); // usado p enviar o id da categoria na req
    const [adNegPrice, setNegPrice] = useState(false);
    const [adPrice, setAdPrice] = useState('');
    const [adDescription, setAdDescription] = useState('');
    const [adImages, setAdImages]: any = useState([]);

    const [userAds, setUserAds] = useState([]);
    const [categories, setCategories] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const [disabledModal, setDisabledModal] = useState(true);

    const [deletedImages, setDeletedImages]: any = useState([]);

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    });

    const modalHandler = (e, adItem?) => {
        let btnId = e.target.id;

        if (btnId !== 'close') {
            e.preventDefault();

            setDisabledModal(false);

            setAdTitle(adItem.title);
            setAdStatus(adItem.status);
            setAdCategory(adItem.category);
            setNegPrice(adItem.priceNegotiable);
            setAdPrice(adItem.price);
            setAdDescription(adItem.description);
            setAdImages(adItem.images);
            setAdId(adItem.id);
            console.log(adItem);
            
        } else {
            setDisabledModal(true);
            setDeletedImages([])
        }
    };

    // const delImage = (e, url) => {
    //     const filterDelImages = () => {
    //         return deletedImages.filter((item) => item != url);
    //     };

    //     let btnValue = e.currentTarget.innerText;

    //     if (btnValue != 'Desfazer') {
    //         setDeletedImages(arr => [...arr, url]);
    //     } else {
    //         setDeletedImages(filterDelImages);
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors: any[] = [];
        let newImage: any = [];
        console.log(adSlugIdCategory)
        if (errors.length === 0) {
            const fData: any = new FormData();
            fData.append('title', adTitle);
            fData.append('status', adStatus);
            fData.append('price', adPrice);
            fData.append('priceneg', adNegPrice);
            fData.append('desc', adDescription);
            fData.append('cat', adSlugIdCategory);
            // if (deletedImages[0]) {
            //     adImages.map((item) => {
            //         if (!deletedImages.includes(item.url)) newImage.push(item);
            //     });
            //     fData.append('images', newImage)
            // };

            if (fileField.current.files.length > 0) {
                for (let i = 0; i < fileField.current.files.length; i++) {
                    fData.append('img', fileField.current.files[i]);
                }
            }
            const json = await OlxAPI.updateAds(fData, adId);
            if (!json.error) {
                setDisabledModal(true);
                return;
            } else {
                setError(json.error);
            }
        } else {
            setError(errors.join("\n"));
        }
        setDisabled(false);
    };

    useEffect(() => {
        const getEditableAds = (json) => {
            try {
                const userData = json.userData;
                setUserAds(userData.ads);
            } catch { }
        };
        getEditableAds(userJson);
    }, [userJson]);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await OlxAPI.getCategories();
            setCategories(cats);
        };
        getCategories();
    }, []);

    return (
        <AdsArea>
            {userAds.map((item: any, index) =>
                <div className="editableAds" key={index}>
                    <AdItem data={item} />
                    <button id="" onClick={(e) => modalHandler(e, item)}>Editar</button>
                </div>
            )}
            {!disabledModal &&


                <FormArea>
                    {error &&
                        <div>{error}</div>
                    }
                    <form onSubmit={handleSubmit}>
                        <button id="close" onClick={(e) => modalHandler(e)}>X</button>

                        <label htmlFor="title" className="area">
                            <div className="area--title">Título</div>
                            <div className="area--input">
                                <input type="text" name="title" id="title"
                                    disabled={disabled}
                                    value={adTitle}
                                    onChange={e => setAdTitle(e.target.value)}
                                    required
                                />
                            </div>
                        </label>

                        {/* <label htmlFor="status" className="area">
                            <div className="area--title">Visível</div>
                            <div className="area--input">
                                <input type="checkbox" name="status" id="status"
                                    disabled={disabled}
                                    checked={adStatus}
                                    onChange={e => setAdStatus(!adStatus)}
                                />
                            </div>
                        </label> */}

                        <label htmlFor="categories" className="area">
                            <div className="area--title">Categoria</div>
                            <div className="area--input">
                                <select name="categories" id=""
                                    disabled={disabled}
                                    onChange={e => setAdSlugIdCategory(e.target.value)}
                                    required
                                    placeholder={adCategory}
                                >
                                    <option></option>
                                    {categories && categories.map((i: any, index) =>
                                        <option key={index} value={i.slug}>{i.name}</option>
                                    )}
                                </select>
                            </div>
                        </label>

                        <label htmlFor="price" className="area">
                            <div className="area--title">Preço</div>
                            <div className="area--input">
                                <MaskedInput
                                    mask={priceMask}
                                    placeholder="R$ "
                                    disabled={disabled || adNegPrice}
                                    value={adPrice}
                                    onChange={e => setAdPrice(e.target.value)}
                                />
                            </div>
                        </label>

                        <label htmlFor="negotiable" className="area">
                            <div className="area--title">Preço Negociável</div>
                            <div className="area--input">
                                <input type="checkbox" name="negotiable" id="negotiable"
                                    disabled={disabled}
                                    checked={adNegPrice}
                                    onChange={e => setNegPrice(!adNegPrice)}
                                />
                            </div>
                        </label>

                        <label htmlFor="description" className="area">
                            <div className="area--title">Descrição</div>
                            <div className="area--input">
                                <textarea name="description" id="description"
                                    disabled={disabled}
                                    value={adDescription}
                                    onChange={e => setAdDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </label>

                        <label htmlFor="images" className="area">
                            <div className="area--title">Imagens (1 ou mais)</div>
                            <div className="area--input">
                                <input type="file"
                                    disabled={disabled}
                                    ref={fileField}
                                    multiple
                                />
                            </div>
                        </label>

                        {/* <label htmlFor="images" className="area">
                            <div className="area--title">Imagens:</div>
                            <div className="area--images">
                                {adImages && adImages.map((item: any, index) =>
                                    <figure key={index}>
                                        <CloseSpan onClick={(e) => delImage(e, item.url)}>
                                            {deletedImages.includes(item.url) ? 'Desfazer' : 'X'}
                                        </CloseSpan>
                                        <img src={`http://alunos.b7web.com.br:501/media/${item.url}`} alt=""
                                            hidden={deletedImages.includes(item.url) ? true : false}
                                        />
                                    </figure>
                                )}
                            </div>
                        </label> */}

                        <div className="area">
                            <div className="area--input">
                                <button id="submit" disabled={false}>Adicionar Anúncio</button>
                            </div>
                        </div>
                    </form>
                </FormArea>
            }
        </AdsArea>
    );
}