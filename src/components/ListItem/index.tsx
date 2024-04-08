import React, { useState } from 'react';
import * as C from './styles';
import { Item, TarefasServices } from '../../services/api/tarefas/TarefasServices';
import { format, isValid } from 'date-fns';
import tarefasPDF from '../ListPdf/tarefas';
import { Modal } from '../Modal/updatetask';
import { ApiException } from '../../services/api/ApiException';

type Props = {
    item: Item;
    onToggleDone: (id: number, done: boolean) => void;
    onRemoveTask: (id: number) => void;
    onUpdateTask: (id: number, newData: Item) => void; // Alterado para aceitar um Item
};

export const ListItem: React.FC<Props> = ({ item, onToggleDone, onRemoveTask, onUpdateTask }) => {
    const [completed, setCompleted] = useState(item.estaCompleta);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const handleCloseUpdateModal = () => {
        setOpenUpdateModal(false);
    };

    const handleSwitchChange = () => {
        const newValue = !completed;
        setCompleted(newValue);
        onToggleDone(item.id, newValue);
    }

    const renderDate = () => {
        if (completed) {
            return `Concluída ${format(new Date(item.createdAt), 'dd/MM/yyyy')}`;
        } else if (item.updatedAt) {
            return `Atualizada ${format(new Date(item.updatedAt), 'dd/MM/yyyy')}`;
        } else {
            return `Criada ${format(new Date(item.createdAt), 'dd/MM/yyyy')}`;
        }
    };
    
    
    
    

    const formattedLimitedAt = isValid(new Date(item.limitedAt)) ? format(new Date(item.limitedAt), 'dd/MM/yyyy') : '';

    const handleUpdateTask = async (id: number, newData: Item) => {
        try {
            const updatedTask = await TarefasServices.updateById(item.id, newData);
            // Verifica se a atualização foi bem-sucedida
            if (updatedTask instanceof ApiException) {
                console.error('Erro ao atualizar a tarefa:', updatedTask.message);
            } else {
                console.log('Tarefa atualizada com sucesso!');
                setOpenUpdateModal(false); // Fechar o modal após a atualização
                onUpdateTask(item.id, newData); // Atualizar a tarefa na lista
            }
        } catch (error) {
            console.error('Erro ao atualizar a tarefa:', error);
        }
    };

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
            
            <button
                onClick={() => setOpenUpdateModal(true)}
                className="btn_editar_tarefa"
            >
                Alterar
            </button>
            {openUpdateModal && (
                <Modal
                    isOpen={openUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onUpdateTask={handleUpdateTask}
                    taskToUpdate={item}
                />
            )}

            <button onClick={() => onRemoveTask(item.id)} className="btn_excluir_tarefa">Excluir</button>
            <button onClick={() => tarefasPDF([item])} className="btn-gerar-pdf">PDF</button>
        </C.Container>
    );
};
