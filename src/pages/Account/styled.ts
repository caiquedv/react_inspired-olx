import styled from "styled-components";
import { PageContainer  } from "../../AppStyles";

export const MyAccContainer = styled(PageContainer)`
display: flex;
flex-direction: column;
text-align: center;

h1 {
    text-align: center;
}

.personalArea {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
/* .list {
    flex-wrap: wrap;
} */
`;