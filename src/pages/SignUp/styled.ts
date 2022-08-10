import styled from "styled-components";

export const PageArea = styled.div`
    form {
        background-color: #fff;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0 0 3px #999;

        .area {
            display: flex;
            align-items: center;
            padding: 10px;
            max-width: 500px;

            .area--title {
                width: 200px;
                text-align: right;
                padding-right: 20px;
                font-weight: bold;
                font-size: 14px;
            }
            .area--input {
                flex: 1;

                input:not(#remember) {
                    width: 100%;
                    font-size: 14px;
                    padding: 5px;
                    border-radius: 3px;
                    outline: 0;
                    border: 1px solid #999;
                    transition: all ease .4s;

                    &:focus {
                        border: 1px solid #333;
                        color: #333;
                    }
                }

                button {
                    background-color: #0089ff;
                    border: 0;
                    outline: 0;
                    padding: 5px 10px;
                    border-radius: 4px;
                    color: #fff;
                    font-size: 15px;
                    cursor: pointer;

                    &:hover {
                        background-color: #006fce;
                    }
                }
            }
        }
    }
`;