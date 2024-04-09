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
        cursor: pointer;
    }
    .pesquisar-tarefa {
        color: ${props => props.theme.colors.text}; 
        font-size: 18px;
        margin: 0 10px;
        margin: 0 10px;
        background: ${props => props.theme.colors.background};
        border: none;
        border-radius: 5px;
        padding: 5px;
        font-size: 16px;
        transition: 0.3s;
        margin-left: 400px;
        
        &:hover {
            background-color: ${props => props.theme.colors.primary};
            color: ${props => props.theme.colors.text};
            transition: 0.3s;


        }
    }
`;