import * as C from './styles';
import { Item } from '../../services/api/tarefas/TarefasServices';
import { format, isValid } from 'date-fns';
import React, { useState } from 'react';
import tarefasPDF from '../ListPdf/tarefas'

type Props = {
    item: Item;
    onToggleDone: (id: number, done: boolean) => void;
    onRemoveTask: (id: number) => void;
    onUpdateTask: (id: number, name: string) => void;
}

export const ListItem: React.FC<Props> = ({ item, onToggleDone, onRemoveTask, onUpdateTask }) => {
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
            return `Concluída ${item.updatedAt ? format(new Date(item.updatedAt), 'dd/MM/yyyy') : format(new Date(item.createdAt), 'dd/MM/yyyy')}`;
        } else {
            return `Criada ${format(new Date(item.createdAt), 'dd/MM/yyyy')}`;
        }
    };

    const formattedLimitedAt = isValid(new Date(item.limitedAt)) ? format(new Date(item.limitedAt), 'dd/MM/yyyy') : '';

    return (
        <C.Container done={completed}>
            <label className='switch-list'>
                <input type='checkbox' checked={completed} onChange={handleSwitchChange} />
                <span className='slider round'></span>
            </label>
            <label className='task' style={{ color: completed ? 'green' : '#ccc' }}>{item.nomedaTarefa}</label>
            <label className="task-importance">{item.importancia}</label>
            <span className='date-limited'>Data Limite: {formattedLimitedAt}</span>
            <span className="date">{renderDate()}</span>
            
            <button onClick={handleUpdateTask} className="btn_editar_tarefa">Alterar</button>
            <button onClick={() => onRemoveTask(item.id)} className="btn_excluir_tarefa">Excluir</button>
            <button onClick={() => tarefasPDF([item])} className="btn-gerar-pdf">Gerar PDF</button>
        </C.Container>
    );
}
