import { useState, KeyboardEvent } from 'react';
import * as C from './styles';

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
            <div className="image" onClick={handleAddTask}>➕</div>
            <input
                type="text"
                placeholder="Adicione uma tarefa"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyUp={handleKeyUp}
            />
        </C.Container>
    );
};

export default AddArea;
