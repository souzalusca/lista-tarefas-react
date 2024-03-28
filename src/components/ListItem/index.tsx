import * as C from './styles';
import { Item } from '../../services/api/tarefas/TarefasServices';
import { format } from 'date-fns';
import React, { useState } from 'react';

type Props = {
    item: Item;
    onToggleDone: (id: number, done: boolean) => void; // Função para lidar com a alteração do estado done
    onRemoveTask: (id: number) => void; // Função para lidar com a remoção de um item
    onUpdateTask: (id: number, name: string) => void; // Função para lidar com a atualização de um item
}
 
export const ListItem = ({ item, onToggleDone, onRemoveTask, onUpdateTask }: Props) => {
    const [completed, setCompleted] = useState(item.estaCompleta);

    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.checked;
        onToggleDone(item.id, newValue);
    }

    const handleUpdateTask = () => {
        const newValue = prompt('Insira o novo nome da tarefa:', item.nomedaTarefa) || '';
        if (newValue !== item.nomedaTarefa)
            onUpdateTask(item.id, newValue);
    }

    const toggleCompleted = () => {
        setCompleted(!completed);
        onToggleDone(item.id, !completed);
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

    return (
        <C.Container done={completed}>
            {/* Utilização do switch para renderizar o emoji correto */}
            <span role="img" aria-label={completed ? "Concluída" : "Não concluída"} onClick={toggleCompleted}>
                {completed ? '✅' : '❌'}
            </span>
            {/* Renderiza o nome da tarefa com cor condicional */}
            <label style={{ color: completed ? 'green' : 'red' }}>{item.nomedaTarefa}</label>
            {/* Renderiza a data */}
            <span className="date">{renderDate()}</span>
            {/* Botão para remover a tarefa */}
            <button onClick={() => onRemoveTask(item.id)}>🗑️</button>
            {/* Botão para atualizar a tarefa */}
            <button onClick={handleUpdateTask}>✏️</button>
        </C.Container>
    );
}
