import * as C from './styles';
import { Item } from '../../services/api/tarefas/TarefasServices';
import { format } from 'date-fns';

type Props = {
    item : Item
    onToggleDone: (id: number, done: boolean) => void; // Função para lidar com a alteração do estado done
    onRemoveTask: (id: number) => void; // Função para lidar com a remoção de um item
    onUpdateTask: (id: number, name: string) => void; // Função para lidar com a atualização de um item
}
 
export const ListItem = ({ item, onToggleDone, onRemoveTask, onUpdateTask }: Props) => {
    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.checked;
        onToggleDone(item.id, newValue);
    }
  
    const handleRemoveTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        onRemoveTask(item.id);
    } 
  
    const handleUpdateTask = () => {
        const newValue = prompt('Insira o novo nome da tarefa:', item.nomedaTarefa) || '';
        if (newValue !== item.nomedaTarefa)
            onUpdateTask(item.id, newValue);
    }

    const renderDate = () => {
        if (item.updatedAt) {
            return `Atualizada em ${format(new Date(item.updatedAt), 'dd/MM/yyyy')}`;
        } else {
            return `Criada em ${format(new Date(item.createdAt), 'dd/MM/yyyy')}`;
        }
    };
    
    return (
        <C.Container done={item.estaCompleta}>
            <input 
                type="checkbox" 
                checked={item.estaCompleta}
                onChange={handleCheckBoxChange}
            />
            <button onClick={handleRemoveTask}>❌</button>
            <button onClick={handleUpdateTask}>✏️</button>
            <label>{ item.nomedaTarefa }</label>
            <span className="date">{renderDate()}</span>
        </C.Container>
    );
}
