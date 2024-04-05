import React, { useState } from 'react';
import * as C from './Modal.styled';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (taskName: string, dueDate: string, importance: string) => void;
};

export const Modal = ({ isOpen, onClose, onAddTask }: Props) => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [importance, setImportance] = useState('Importante');

  const handleAddTask = () => {
    if (dueDate.trim() === '') {
      alert('Data de vencimento não inserida');
      return; // Impede a adição da tarefa se a data não estiver inserida
    }

    if (taskName.trim() !== '') {
      onAddTask(taskName, dueDate, importance);
      setTaskName('');
      setDueDate('');
      setImportance('Importante');
      onClose();
    } else {
      console.log('Nome da tarefa vazio, não adicionando tarefa');
    }
  };

  const handleCancel = () => {
    setTaskName('');
    setDueDate('');
    setImportance('Importante');
    onClose();
  };

  return isOpen ? (
    <C.Container>
        <div className='backgroundDoModal'>
      <div className='backgroundModal'>
        <h2 className='title'>Adicione uma tarefa</h2>
        <div className='form'>
          <label htmlFor="Nome">Nome da tarefa</label>
          <input
            className='input-tarefa'
            type="text"
            placeholder="Adicione uma tarefa"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <label htmlFor="Data">Data Limite</label>
          <input
            className='input-date'
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <label>Importancia da tarefa</label>
          <select
            className='select'
            name="Importance"
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
          >
            <option value="Importante">Importante</option>
            <option value="Nao importante">Nao Importante</option>
            <option value="Muito importante">Muito Importante</option>
          </select>
        </div>
        <div className='buttons'>
          <button className='buttonAdd' onClick={handleAddTask}>Adicionar Tarefa</button>
          <button className='buttonCancel' onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
      </div>
    </C.Container>
  ) : null;
};
