import { useState, KeyboardEvent } from 'react';
import * as C from './styles';
import { FaPlusCircle } from 'react-icons/fa'; // Importe o ícone de adição
type Props = {
    onEnter: (taskName: string) => void;
};

export const AddArea = ({ onEnter }: Props) => {
    const [inputText, setInputText] = useState('');

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.code === 'Enter' && inputText.trim() !== '') {
            onEnter(inputText.trim());
            setInputText('');
        }
    };

    const handleAddTask = () => {
        if (inputText.trim() !== '') {
            onEnter(inputText.trim());
            setInputText('');
        }
    };

    return (
        <C.Container>
            {/* Adiciona uma tarefa ao clicar no emoji roxo */}
            <input
                type="text"
                placeholder="Adicione uma tarefa"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyUp={handleKeyUp}
            />
            {/* Adiciona uma tarefa ao clicar no ícone de adição */}
            <FaPlusCircle className="add-icon" onClick={handleAddTask} />
        </C.Container>
    );
};

export default AddArea;
