import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { PageContainer, PageTitle, ErrorMessage } from "../../AppStyles";
import { PageArea } from "./styled";

import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { OlxAPI } from "../../helpers/OlxAPI";

export const AddAd = () => {
    const fileField: any = useRef();
    const navigate = useNavigate()

    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            const cats = await OlxAPI.getCategories();
            setCategories(cats);
        };
        getCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors: any[] = [];

        if (!title.trim()) {
            errors.push('Sem título');
        }

        if (!category) {
            errors.push('Sem categoria');
        }

        if (errors.length === 0) {
            const fData: any = new FormData();
            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegotiable);
            fData.append('desc', desc);
            fData.append('cat', category);
            

            if(fileField.current.files.length > 0) {
                for (let i = 0; i < fileField.current.files.length; i++) {
                    fData.append('img', fileField.current.files[i]);
                }
            }
            console.log(fData + '1');
            const json = await OlxAPI.addAd(fData);
            console.log(fData+'2');
            if(!json.error) {
                navigate(`/ad/${json.id}`);
                return;
            } else {
                setError(json.error);
            }
        } else {
            setError(errors.join("\n"));
        }
        setDisabled(false);

    }

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    });

    return (
        <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title" className="area">
                        <div className="area--title">Título</div>
                        <div className="area--input">
                            <input type="text" name="title" id="title"
                                disabled={disabled}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label htmlFor="categories" className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select name="categories" id=""
                                disabled={disabled}
                                onChange={e => console.log(categories)}
                                required
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
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <label htmlFor="negotiable" className="area">
                        <div className="area--title">Preço Negociável</div>
                        <div className="area--input">
                            <input type="checkbox" name="negotiable" id="negotiable"
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={e => setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>
                    <label htmlFor="description" className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                            <textarea name="description" id="description"
                                disabled={disabled}
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
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
                    <div className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button id="submit" name="submit" disabled={disabled}>Adicionar Anúncio</button>
                        </div>
                    </div>
                </form>
            </PageArea>
        </PageContainer>
    );
}