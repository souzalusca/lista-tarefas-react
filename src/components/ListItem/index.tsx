import { useState } from 'react';
import * as C from './styles';
import { Item } from '../../types/item'
type Props = {
    item : Item
    onToggleDone: (id: number, done: boolean) => void; // Função para lidar com a alteração do estado done

}
 

export const ListItem = ({ item, onToggleDone }: Props) => {
    
    const [isChecked, setIsChecked] = useState(item.done);
    
    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const newValue = e.target.checked;
        setIsChecked(newValue);
        onToggleDone(item.id, newValue);
    } 
    return (
         
        <C.Container done={isChecked}>
          <input 
          type="checkbox" 
          checked={isChecked}
          onChange={handleCheckBoxChange}
          />

          <label>{item.name} - {item.done.toString()}</label>
        </C.Container>
    )
}