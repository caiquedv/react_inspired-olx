import styled from "styled-components";

export const Form = styled.form`
flex:1; 
width: 100%; 
max-width: 600px; 
background-color: #FFF;
border-radius: 5px;
box-shadow: 0 0 4px #999;
padding: 0 15px;
transition: all ease 0.3s;

.area {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;

    .area--input {
        input, select {
            text-align: right;
            margin-right: 10px;
            outline: 0;
            border: 1px solid #999;
            color: #333;
            background-color: #fff;
            transition: all ease 0.3s;
            border-radius: 5px;

            &:focus {
                border: 1px solid #333;
            }

            &:disabled {
                color: #777;
                border: 0;
            }
        }

        & button {
            background-color: unset;
            border: 0;
            color: #9BB83C;
            font-weight: bold;
            cursor: pointer;
            transition: all ease .3s;

            &:hover {
                color: #9BB83Caa;
            }
        }
    }
}

& hr {
    height: 1px;
    background-color: #ccc;
    border: none;
    margin: 0;
}

`;