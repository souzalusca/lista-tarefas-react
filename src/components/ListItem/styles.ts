import styled from 'styled-components';

type ContainerProps = {
    done: boolean;
}

export const Container = styled.div<ContainerProps>(({ done, theme}) => `
    display: flex;
    background-color: ${ done ? theme.colors.secundary : theme.colors.primary};
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    align-items: center;

    .switch-list {
        position: relative;
        display: inline-block;
        width: 10px;
        height: 15px;
    }

    .switch-list input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fbec5d;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "  ";
        height: 12px;
        width: 10px;
        left: 0px;
        bottom: 2px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .3s;
        border-radius: 20%;
    }

    input:checked + .slider {
        background-color: green;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(10px);
        -ms-transform: translateX(10px);
        transform: translateX(19px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }

    label {
        color: ${done ? theme.colors.textgreen : theme.colors.text} !important;
        
        text-decoration: ${done ? 'line-through' : 'initial'};
        padding: 0px 10px;
    }

    .date {
        font-size: 11px;
        color: ${done ? theme.colors.textgreen : theme.colors.text};
        margin-left: auto;
        margin-right: 10px;
        font-style: italic;
        font-weight: bold;
        text-align: right;
    }
    .btn_editar_tarefa{
        background: #fdc200;
        border: none;
        border-radius: 4px;
        padding: 6px 10px!important;
        
    }
    .btn_excluir_tarefa{
        background: #d9364a;
        border: none;
        border-radius: 4px;
        font-size: ;
        color: white;
        padding: 6px 10px!important;
        
    }
    .btn-gerar-pdf{
        background: #fdc200;
        border: none;
        border-radius: 4px;
        padding: 6px 10px!important;
        font-size: 11px;
        
    }
    .task {
        color: ${theme.colors.text};
        text-decoration: ${done ? 'line-through' : 'initial'};
        text-align: center;
        display: flex;
        flex-grow: 1; /* Ocupa todo o espaço disponível */
        max-width: calc(100% - 100px); /* Ajuste conforme necessário */
        overflow: hidden;
    }
    .date-limited {
        font-size: 11px;
        color: ${done ? theme.colors.textgreen : theme.colors.text};
        padding: 0px 0px 0px 200px ;
        margin-right: 50px;
        font-style: italic;
        font-weight: bold;
        text-align: left;
        display: flex;

    }
    .task-importance {
        margin-left: auto; /* Defina a posição desejada */
        top: 0;
        font-size: 11px;
        color: ${theme.colors.text};
        font-style: italic;
        font-weight: bold;
        text-align: center;
    }
 
`);
