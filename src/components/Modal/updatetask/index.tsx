import React, { useState, useEffect } from 'react';
import * as C from './Modal.styled';
import { Item, TarefasServices } from '../../../services/api/tarefas/TarefasServices'; // Importe o tipo Item
import { ApiException } from '../../../services/api/ApiException';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onUpdateTask: (id: number, newData: Item) => void; // Alterado para aceitar um Item completo
    taskToUpdate: Item; // A tarefa a ser atualizada
};

export const Modal: React.FC<Props> = ({ isOpen, onClose, onUpdateTask, taskToUpdate }) => {
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [importance, setImportance] = useState('Importante');

    useEffect(() => {
        // Preenche os campos do modal com os valores da tarefa a ser atualizada
        if (taskToUpdate) {
            setTaskName(taskToUpdate.nomedaTarefa); // Alterado para nomedaTarefa
            setDueDate(taskToUpdate.limitedAt); // Alterado para limitedAt
            setImportance(taskToUpdate.importancia);
        }
    }, [taskToUpdate]);

    const handleUpdateTask = async () => {
        // Verifica se algum dos campos está vazio
        if (!taskName || !dueDate || !importance) {
            console.error('Todos os campos devem ser preenchidos');
            alert('Todos os campos devem ser preenchidos');
            return;
        }
    
        const newData: Item = {
            ...taskToUpdate,
            nomedaTarefa: taskName,
            limitedAt: dueDate,
            importancia: importance,
            updatedAt: new Date().toISOString(),
        };
        
        try {
            const updatedTask = await TarefasServices.updateById(taskToUpdate.id, newData);
            // Verifica se a atualização foi bem-sucedida
            if (updatedTask instanceof ApiException) {
                console.error('Erro ao atualizar a tarefa:', updatedTask.message);
            } else {
                console.log('Tarefa atualizada com sucesso!');
                onClose(); // Fechar o modal após a atualização
                onUpdateTask(taskToUpdate.id, newData); // Atualizar a tarefa na lista
            }
        } catch (error) {
            console.error('Erro ao atualizar a tarefa:', error);

        }
    };
    

    const handleCancel = () => {
        onClose(); // Fecha o modal sem atualizar
    };

    return isOpen ? (
        <C.Container>
            <div className='backgroundDoModal'>
                <div className='backgroundModal'>
                    <h2 className='title'>Atualize sua tarefa</h2>
                    <div className='form'>
                        <label className='label-tarefa' htmlFor="Nome">Nome da tarefa</label>
                        <input
                            className='input-tarefa'
                            type="text"
                            placeholder="Atualize uma tarefa"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        <label className='label-date' htmlFor="Data">Data Limite</label>
                        <input
                            className='input-date'
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                        <label className='label-importance' htmlFor="Importance">Importancia da tarefa</label>
                        <select
                            className='select'
                            name="Importance"
                            value={importance}
                            onChange={(e) => setImportance(e.target.value)}
                        >
                            <option value="Importante">Importante</option>
                            <option value="Muito importante">Muito Importante</option>
                            <option value="Nao importante">Nao Importante</option>
                            
                        </select>
                    </div>
                    <div className='buttons'>
                        <button className='buttonAdd' onClick={handleUpdateTask}>Atualizar Tarefa</button>
                        <button className='buttonCancel' onClick={handleCancel}>Cancelar</button>
                    </div>
                </div>
            </div>
        </C.Container>
    ) : null;
};
