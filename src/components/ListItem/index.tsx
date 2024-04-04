import * as C from './styles';
import { Item } from '../../services/api/tarefas/TarefasServices';
import { format, isValid } from 'date-fns'; // Importe a função isValid
import React, { useState } from 'react';

type Props = {
    item: Item;
    onToggleDone: (id: number, done: boolean) => void;
    onRemoveTask: (id: number) => void;
    onUpdateTask: (id: number, name: string) => void;
}

export const ListItem = ({ item, onToggleDone, onRemoveTask, onUpdateTask }: Props) => {
    const [completed, setCompleted] = useState(item.estaCompleta);

    const handleSwitchChange = () => {
        const newValue = !completed;
        setCompleted(newValue);
        onToggleDone(item.id, newValue);
    }

    const handleUpdateTask = () => {
        const newValue = prompt('Insira o novo nome da tarefa:', item.nomedaTarefa) || '';
        if (newValue !== item.nomedaTarefa && newValue.trim() !== '')
            onUpdateTask(item.id, newValue);
    }

    const renderDate = () => {
        if (completed) {
            return `Concluída em ${format(new Date(item.updatedAt || item.createdAt), 'dd/MM/yyyy HH:mm')}`;
        } else if (item.updatedAt) {
            return `Atualizada em ${format(new Date(item.updatedAt), 'dd/MM/yyyy')}`;
        } else {
            return `Criada em ${format(new Date(item.createdAt), 'dd/MM/yyyy')}`;
        }
    };

    const formattedLimitedAt = isValid(new Date(item.limitedAt)) ? format(new Date(item.limitedAt), 'dd/MM/yyyy') : '';

    return (
        <C.Container done={completed}>
            <label className="switch-list">
                <input type="checkbox" checked={completed} onChange={handleSwitchChange} />
                <span className="slider round"></span>
            </label>
            <label style={{ color: completed ? 'green' : '#ccc' }}>{item.nomedaTarefa}</label>
            <label className="">{item.importancia}</label>
            <span> Data Limite: {formattedLimitedAt}</span>
            <span className="date">{renderDate()}</span>
            
            <button onClick={handleUpdateTask} type="button" className="btn_editar_tarefa" style={{ fontSize: '11px', padding: '5px 10px', marginRight: '5px' }}>Alterar</button>
            <button onClick={() => onRemoveTask(item.id)} type="button" className="btn_excluir_tarefa" style={{ fontSize: '11px', padding: '5px 10px', marginRight: '5px' }}>Excluir</button>
        </C.Container>
    );
}
