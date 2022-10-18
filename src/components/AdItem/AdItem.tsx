import React from "react";
import { Item } from './styled';
import { Link } from 'react-router-dom';

export const AdItem = (props) => {
    let price = '';

    if (props.data.priceNegotiable) {
        price = 'Preço Negociável';
    } else {
        price = `R$ ${props.data.price}`;
    }
    // console.log(props.data);

    return (
        <Item className="adItem">
            <Link to={`/react_inspired-olx/ad/${props.data.id}`}>
                <div className="itemImage">
                    {props.data.images &&
                        props.data.images.map((item, index) =>
                            <img key={index} 
                            src={`http://alunos.b7web.com.br:501/media/${item.url}`} 
                            alt="" />
                        )}
                    {!props.data.images &&
                        <img src={props.data.image} alt="" />
                    }
                </div>
                <div className="itemName">{props.data.title}</div>
                <div className="itemPrice">{price}</div>
            </Link>
        </Item>
    );
}