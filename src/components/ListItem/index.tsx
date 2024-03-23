import { useState } from 'react';
import * as C from './styles';
import { Item } from '../../types/item'

import { format } from 'date-fns';

type Props = {
    item : Item
    onToggleDone: (id: number, done: boolean) => void; // Função para lidar com a alteração do estado done
    onRemoveTask: (id: number) => void; // Função para lidar com a remoção de um item
    onUpdateTask: (id: number, name: string) => void; // Função para lidar com a atualização de um item
    
    
}
 

export const ListItem = ({ item, onToggleDone, onRemoveTask, onUpdateTask }: Props) => {
    
    const [isChecked, setIsChecked] = useState(item.done);

    
    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const newValue = e.target.checked;
        setIsChecked(newValue);
        onToggleDone(item.id, newValue);
    }
    const handleRemoveTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        onRemoveTask(item.id);
    } 
    const handleUpdateTask = () => {
        const newValue = prompt('Insira o novo nome da tarefa:', item.name) || '';
        if (newValue !== item.name)
        onUpdateTask(item.id, newValue );
        
    }
    
    return (
         
        <C.Container done={isChecked}>
          <input 
          type="checkbox" 
          checked={isChecked}
          onChange={handleCheckBoxChange}
          />
          <button onClick={handleRemoveTask}>❌ </button>
          <button onClick={handleUpdateTask}>✏️</button>

          
          <label>
                {item.name} 
            </label>
            {item.updatedAt ? (
            <p className='date'>Atualizada em: {format(new Date(item.updatedAt), 'dd/MM/yyyy')}</p>
        ) : (
            <p className='date'>Criada em: {format(new Date(item.createdAt), 'dd/MM/yyyy')}</p>
        )}
        </C.Container>
    )
}