import styled from "styled-components";

export const Container = styled.div`
    /* Estilos para o fundo escuro do modal */
    .backgroundDoModal {
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        justify-self: center; /* Centraliza horizontalmente */
    }

    /* Estilos para o conteúdo do modal */
    .backgroundModal {
        background-color: ${props => props.theme.colors.backgroundModal};
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 28%;
        height: 53%;
        justify-self: center; /* Centraliza horizontalmente */
        margin-top: 150px; /* Espaçamento superior */
        border-radius: 10px;
    }

    /* Estilos para o formulário dentro do modal */
    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 10px;
    }

    /* Estilos para as divs dentro do formulário, para ocupar o mesmo espaço horizontal */
    .form > div {
        flex: 1; /* Ocupa todo o espaço disponível */
        margin-right: 20px; /* Espaçamento entre os elementos */
    }

    /* Estilos comuns para labels */
    label {
        color: ${props => props.theme.colors.text};
        font-size: 20px;
        margin: 10px;
        padding: 10px;
    }

    /* Estilos comuns para inputs e selects */
    .input-tarefa,
    .input-date,
    .select {
        border-radius: 6px;
        padding: 5px;
        text-align: center;
        background-color: rgb(249, 222, 222);
        color: ${props => props.theme.colors.textgreen};
        flex: 1; /* Ocupa todo o espaço disponível */
    }

    /* Estilos para o título do modal */
    .title {
        color: ${props => props.theme.colors.text};
        text-align: center;
        margin-top: 30px; /* Espaçamento superior */
        margin-bottom: 10px; /* Espaçamento inferior */
    }

    /* Estilos para os botões dentro do modal */
    .buttons {
        display: flex;
        justify-content: center;
        margin-top: 20px; /* Espaçamento superior */
    }

    /* Estilos para os botões Adicionar Tarefa e Cancelar */
    .buttonAdd,
    .buttonCancel {
        background-color: rgb(97, 178, 200);
        color: white;
        border-radius: 10px;
        padding: 10px;
        margin: 10px;
    }

    /* Estilos específicos para o botão Cancelar */
    .buttonCancel {
        background-color: #d9364a;
    }
`;
