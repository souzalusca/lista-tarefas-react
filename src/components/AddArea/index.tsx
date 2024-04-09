import React, { useState } from 'react';
import * as C from './styles';
import { FaPlusCircle } from 'react-icons/fa';
import { Modal } from '../Modal';
import { Item } from '../../services/api/tarefas/TarefasServices';

type Props = {
  onAddTask: (taskName: string, dueDate: string, importance: string) => void;
  tasks: Item[];
  onFilterTasks: (searchTerm: string) => void; // Adicione a função de filtro como propriedade
};

export const AddArea = ({ onAddTask, tasks, onFilterTasks }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterTasks(value); // Chamando a função de filtro ao alterar o valor do campo de pesquisa
  };

  return (
    <C.Container>
      <div className="search-bar">
       
        <FaPlusCircle className="add-icon" onClick={() => setOpenModal(true)} />
      </div>
      <p className='open-modal' onClick={() => setOpenModal(true)}>Clique aqui para adicionar uma tarefa</p>
      <input
          className='pesquisar-tarefa'
          type="text"
          placeholder="Buscar tarefa"
          value={searchTerm}
          onChange={handleSearchChange}
        />

      {openModal && (
        <Modal
          isOpen={openModal}
          onClose={handleModalClose}
          onAddTask={onAddTask}
        />
        
      )}

    </C.Container>
  );
};
