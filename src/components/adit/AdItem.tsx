import React, { useState } from "react";
import { Item } from './styled';
import { Link } from 'react-router-dom';

export const AdItem = (props) =>{
    const [disabledModal, setDisabledModal] = useState(false);

    let price = '';

    if(props.data.priceNegotiable) {
        price = 'Preço Negociável';
    } else {
        price = `R$ ${props.data.price}`;
    }

    return (
        <Item className="adItem">
            <Link to={`/ad/${props.data.id}`}>
                <div className="itemImage">
                    {props.data.images &&
                        props.data.images.map((item, index) =>
                        <img key={index} src={`http://alunos.b7web.com.br:501/media/${item.url}`} alt="" />
                    )}
                    <img src={props.data.image} alt="" />
                </div>
                <div className="itemName">{props.data.title}</div>
                <div className="itemPrice">{price}</div>
                <button onClick={() => alert(true)}>Editar</button>
            </Link>
        </Item>
    );
}