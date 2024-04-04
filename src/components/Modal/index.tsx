import { useState } from 'react';
import * as C from './Modal.styled';

export function Modal({ isOpen, onClose, onAddTask }: any) {
    const [inputText, setInputText] = useState('');
    const [importance, setImportance] = useState('Importante');
    const [deadline, setDeadline] = useState('');

    const handleAddTask = () => {
        if (inputText.trim() !== '') {
            onAddTask(inputText.trim(), importance, deadline);
            setInputText('');
            setImportance("Importante");
            setDeadline('');
            onClose();
        }
    };

    const handleCancel = () => {
        setInputText('');
        setImportance('Importante');
        setDeadline('');
        onClose();
    };

    return isOpen ? (
        <C.Container>
            <div className='backgroundModal'>
                <h2 className='title'>Adicione uma tarefa</h2>
                <div className='form'>
                    <label htmlFor="Nome">Nome da tarefa</label>
                    <input
                        className='input-tarefa'
                        type="text"
                        placeholder="Adicione uma tarefa"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <label htmlFor="Data">Data Limite</label>
                    <input
                        className='input-date'
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
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
                    <button className='buttonAdd' onClick={handleAddTask}>Adicionar</button>
                    <button className='buttonCancel' onClick={handleCancel}>Cancelar</button>
                </div>
            </div>
        </C.Container>
    ) : null;
}
