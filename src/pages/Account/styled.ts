import styled from "styled-components";
import { PageContainer  } from "../../AppStyles";

export const MyAccArea = styled(PageContainer)`
h1 {
    text-align: center;
}
`;

export const PageArea = styled.div`
display: flex;
flex-direction: column;
align-items: center;

form {
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
                color: #00F;
                cursor: pointer;
            }
        }
    }

    & hr {
        height: 1px;
        background-color: #ccc;
        border: none;
        margin: 0;
    }
    /* .userInfo {
        margin: 0;
        padding: 0 25px;
        list-style: none;
        width:100%;
        background-color: #FFF;
       

        & li {
            padding: 25px 0;
            display: flex;
            justify-content: space-between;
        }

        & hr{
            height: 1px;
            background-color: #ccc;
            border: none;
            margin: 0;
        }
    } */
}

.userAds {
    
}   
`;