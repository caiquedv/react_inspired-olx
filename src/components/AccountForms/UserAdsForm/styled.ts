import styled from "styled-components";
import { PageArea } from "../../../pages/AddAd/styled";

export const AdsArea = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-wrap: wrap;
gap: 1.5rem;


.editableAds {
    width: 25%;
    background-color: #FFF;
    border-radius: 5px;

    & button {
        margin: 10px;
        background-color: #9BB83C;
        color: #FFF;
        border: unset;
        padding: 5px 15px;
        cursor: pointer;
        transition: all ease .2s;

        &:hover {
            background-color: #9BB83CAA
        }
    }
}
`;

export const FormArea = styled(PageArea)`
position: fixed; 
top: 1.5rem; 
background-color: #FFF;

#closeFormModal {
    width: 100%;
    text-align: right;
}

.area--images {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    figure {
        display: flex;
        margin: 0;
        width: 100px; 
        position: relative;
        
        span:hover + img {
            background-color: #ccc;
        }
    }

    img {
        width: 100%; 
        height: 100%;    
        padding: 2px; 
        border: 1px solid black;  
    }
}
`;

export const CloseSpan = styled.span`
display: block;
position: absolute;
right: 0;
left: 0;
font-weight: bold;
color: #F00;
font-size: 20px;
cursor: pointer;
`;