import React, { useEffect, useRef, useState } from "react";
import { OlxAPI } from "../../../helpers/OlxAPI";

import { AdItem } from "../../AdItem/AdItem";

import { AdsArea, CloseSpan, FormArea } from "./styled";

import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export const UserAdsForm = (userJson) => {
    const fileField: any = useRef();

    const [adTitle, setAdTitle] = useState('');
    const [adStatus, setAdStatus] = useState(Boolean);
    const [adCategory, setAdCategory] = useState('');
    const [adIdCategory, setAdIdCategory] = useState(''); // usado p enviar o id da categoria na req
    const [adNegPrice, setNegPrice] = useState(false);
    const [adPrice, setAdPrice] = useState('');
    const [adDescription, setAdDescription] = useState('');
    const [adImages, setAdImages] = useState([]);

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
        } else {
            setDisabledModal(true);
            setDeletedImages([])
        }
    };

    const delImage = (e, url) => {
        // let imgsCopy = [...adImages]
        // imgsCopy.splice(index); submit... ideia ruim
        //ideia boa: no submit envia as imagens que não estiverem em deletedImages dps zero esse array
        // console.log(adImages)
        const newArray = () => {
            return deletedImages.filter((item) => item != url);
        };

        let btnValue = e.currentTarget.innerText;

        if (btnValue != 'Desfazer') {
            setDeletedImages(arr => [...arr, url]);
        } else {
            setDeletedImages(newArray);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.nativeEvent.submitter.id)
    };

    useEffect(() => {
        const getEditableAds = async (json) => {
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
                // {error &&
                //     <ErrorMessage>{error}</ErrorMessage>
                // }

                <FormArea>
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

                        <label htmlFor="status" className="area">
                            <div className="area--title">Visível</div>
                            <div className="area--input">
                                <input type="checkbox" name="status" id="status"
                                    disabled={disabled}
                                    checked={adStatus}
                                    onChange={e => setAdStatus(!adStatus)}
                                />
                            </div>
                        </label>

                        <label htmlFor="categories" className="area">
                            <div className="area--title">Categoria</div>
                            <div className="area--input">
                                <select name="categories" id=""
                                    disabled={disabled}
                                    onChange={e => setAdIdCategory(e.target.value)}
                                    required
                                    placeholder={adCategory}
                                >
                                    <option></option>
                                    {categories && categories.map((i: any, index) =>
                                        <option key={index} value={i._id}>{i.name}</option>
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

                        <label htmlFor="images" className="area">
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
                        </label>

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