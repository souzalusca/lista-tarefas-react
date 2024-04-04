import { useState } from 'react';
import * as C from './styles';
import { FaCircle } from 'react-icons/fa';
import { Modal } from '../Modal';

type Props = {
    onEnter: (taskName: string) => void;
};

export const AddArea = ({ onEnter }: Props) => {
    const [inputText, setInputText] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' && inputText.trim() !== '') {
            onEnter(inputText.trim());
            setInputText('');
        }
    };

    const handleAddTask = (taskName: string) => {
        onEnter(taskName);
        setInputText('');
        setOpenModal(false); // Fechar a modal após adicionar a tarefa
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleModalCancel = () => {
        setOpenModal(false); // Fechar a modal se o usuário cancelar
    };

    return (
        <C.Container>
            <input
                type="text"
                placeholder="Adicione uma tarefa"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyUp={handleKeyUp}
            />
            <FaCircle className="add-icon" onClick={() => setOpenModal(true)} />

            {openModal && (
                <Modal
                    isOpen={openModal}
                    onClose={handleModalClose}
                    onAddTask={handleAddTask} // Passando a função handleAddTask para a modal
                    onCancel={handleModalCancel}
                />
            )}
        </C.Container>
    );
};

export default AddArea;
