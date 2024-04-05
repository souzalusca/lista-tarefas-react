import React, { useState } from 'react';
import * as C from './styles';
import { FaCircle, FaGgCircle, FaPlusCircle } from 'react-icons/fa';
import { Modal } from '../Modal';
import { Item } from '../../services/api/tarefas/TarefasServices';

type Props = {
  onAddTask: (taskName: string, dueDate: string, importance: string) => void;
};

export const AddArea = ({ onAddTask }: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <C.Container>
      <FaPlusCircle className="add-icon" onClick={() => setOpenModal(true)} />
        <p className='open-modal' onClick={() => setOpenModal(true)}>Clique aqui para adicionar uma tarefa</p>

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
