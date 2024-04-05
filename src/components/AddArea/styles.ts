import styled from "styled-components";

export const Container = styled.div`
    border: 1px solid #555;
    border-radius: 15px;
    padding: 10px;
    margin: 20px 0;
    display: flex;
    align-items: center;

    .image {
        margin-right: 5px;

    }
    input {
        border: 0px;
        background: ${props => props.theme.colors.background};
        outline: 0;
        color: ${props => props.theme.colors.text};
        font-size: 18px;
        flex: 1;
    }
    .open-modal {
        color: ${props => props.theme.colors.text};
        font-size: 18px;
        cursor: pointer;
        margin: 0 10px;
    }
    .add-icon {
        color: ${props => props.theme.colors.text};
        font-size: 18px;
    }
`;