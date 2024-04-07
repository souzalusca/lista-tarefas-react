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
        text-decoration: ${done ? 'line-through' : 'initial'};

        
    }
    .btn_editar_tarefa{
        background: #fdc200;
        border: none;
        border-radius: 4px;
        padding: 6px 10px!important;
        cursor: pointer;
        margin: 0 0 0 20px;
        
    }
    .btn_excluir_tarefa{
        background: #d9364a;
        border: none;
        border-radius: 4px;
        font-size: ;
        color: white;
        margin: 0 5px;
        padding: 6px 10px!important;
        cursor: pointer;
        
    }
    .btn-gerar-pdf{
        display: inline-block;
      padding: 6px 20px;
      margin: 0 px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      vertical-align: middle;
      font-size: 0.8em
    }
    .task {
        color: ${theme.colors.text};
        text-decoration: ${done ? 'line-through' : 'initial'};
        width: 200px; /* Largura fixa para a Task */
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .date-limited {
        color: ${done ? theme.colors.textgreen : theme.colors.text};
        font-style: italic;
        text-decoration: ${done ? 'line-through' : 'initial'};
        font-weight: bold;
        width: 150px; /* Largura fixa para a Date-limited */
        margin-left: 10px;
        font-size: 11px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .task-importance {
        color: ${theme.colors.text};
        font-style: italic;
        font-size: 14px;
        margin: 0 0 0 20px;
        width: 150px; /* Largura fixa para a Importance */
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
 
`);
