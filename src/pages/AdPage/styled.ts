import styled from "styled-components";

interface Props {
    height: number;
}

export const Fake = styled.div<Props>`
    background-color: #ddd;
    height: ${props=>props.height || 20}px;
`;

export const PageArea = styled.div`
   display: flex;
   margin-top: 20px;

    .box {
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 4px #999;
        margin-bottom: 20px;
    }
    .box--padding {
        padding: 10px;
    }

.leftSide {
    flex: 1;
    margin-right: 20px;

    .adImage {

    }
    .ad-Info {
        padding: 10px;

        .adName {
            margin-bottom: 20px;
        }
        .adDescription {

        }
    }
}
.rightSide {
    width: 250px;
}
`;