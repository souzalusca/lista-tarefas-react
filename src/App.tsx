import { useState } from 'react'
import * as C from './App.styles'
import { Item }  from './types/item';
import {ListItem} from './components/ListItem'  
import { AddArea } from './components/AddArea'
import Tempo from './components/tempo';

const App = () => {
  const[list, setList] = useState<Item[]>([
    
   
  ]) 

  

  const handleAdd = (taskName: string) => {
    let newList = [...list];
    newList.push({
      id: list.length + 1,
      name: taskName,
      done: false,
      createdAt: new Date( Date.now()).toISOString(),
    })
    setList(newList);
  }
  const handleRemoveTask = (id: number) => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);

  }
  const handleUpdateTask = (id: number, name: string) => {
    const newList = list.map(item => {
      if (item.id === id) {
        return { ...item, name, updatedAt: new Date().toISOString() };
      }
      return item;
    });
    setList(newList);
    
  }

  // Função para lidar com a alteração do estado done de um item
  const handleToggleDone = (id: number, done: boolean) => {
    const newList = list.map(item => {
      if (item.id === id) {
        return { ...item, done }; // Atualiza o estado done do item correspondente
      }
      return item;
    });
    setList(newList); // Atualiza o estado da lista com os novos valores
  };


  return (
       <C.Container>
          <C.Area> 
            <Tempo />
            <C.Header>Lista de Tarefas</C.Header> 

             <AddArea onEnter={handleAdd} />


             {list.map(item => (
          <ListItem 
          key={item.id} 
          item={item} 
          onToggleDone={handleToggleDone}  
          onRemoveTask={handleRemoveTask}
          onUpdateTask={handleUpdateTask}/>
        ))}

          </C.Area>
       </C.Container>
  );
}

export default App