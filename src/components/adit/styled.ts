import styled from 'styled-components';

export const Item = styled.div`
a {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #FFF;
    margin: 10px;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
    color: #000;
    background-color: #FFF;
    transition: all ease .2s;
    height: 90%;
    text-align: center;

    &:hover {
        background-color: #EEE;
        border: 1px solid #ccc;
    }

    .itemImage img {
        width: 100%;
        border-radius: 5px;
    }

    .itemName {
        font-weight: bold;
    }
}
`;