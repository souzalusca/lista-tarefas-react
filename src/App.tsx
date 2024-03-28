import React, { useState, useEffect } from 'react';
import * as C from './App.styles';
import { Item, TarefasServices } from './services/api/tarefas/TarefasServices';
import { ListItem } from './components/ListItem';
import { AddArea } from './components/AddArea';
import Tempo from './components/tempo';
import { Route, Routes } from 'react-router-dom';
import NovaPagina from './NovaPagina';
import Navbar from './components/utils/navbar';
import { ApiException } from './services/api/ApiException';

const App = () => {
  const [list, setList] = useState<Item[]>([]);

  const fetchData = async () => {
    try {
      const result = await TarefasServices.getAll();
      if (result instanceof ApiException) {
        alert(result.message);
        console.error('Erro ao buscar tarefas:', result.message);
      } else if (Array.isArray(result)) {
        setList(result);
        console.log('Dados retornados pelo servidor:', result);
      } else {
        console.error('Dados inválidos retornados pelo servidor:', result);
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Chama a função fetchData assim que o componente for montado
  }, []); // O segundo argumento vazio indica que useEffect deve ser executado apenas uma vez, quando o componente é montado
  

  const handleAdd = (taskName: string) => {
    return new Promise((resolve, reject) => {
      setList(prevList => {
        const newId = prevList.length + 1;
        const newItem: Item = {
          id: newId,
          nomedaTarefa: taskName,
          estaCompleta: false,
          createdAt: new Date().toISOString(),
          updatedAt: '' // Pode ser inicializada com uma string vazia
        };
        
        TarefasServices.create({
          nomedaTarefa: taskName,
          estaCompleta: false,
          createdAt: new Date().toISOString(),
          updatedAt: '', 
        }).then(() => {
          resolve(newItem); // Resolve a promessa com o novo item adicionado
        }).catch(error => {
          reject(error); // Rejeita a promessa se ocorrer um erro
        });
        
        return [...prevList, newItem];
      });
    });
  };
  
  const handleRemoveTask = (id: number) => {
    return new Promise((resolve, reject) => {
      const newList = list.filter(item => item.id !== id);
      setList(newList);
      
      // Resolvendo a promessa com o ID do item removido
      resolve(id);
      
      // Não há necessidade de tratamento de erro aqui, já que a operação de filtragem é síncrona e não propensa a erros.
    });
  };
  

  const handleUpdateTask = (id: number, name: string) => {
    const newList = list.map(item => {
      if (item.id === id) {
        return { ...item, nomedaTarefa: name, updatedAt: new Date().toISOString() };
      }
      return item;
    });
    setList(newList);
  };

  const handleToggleDone = (id: number, done: boolean) => {
    const tarefaToUpdate = list.find(item => item.id === id);
    if (!tarefaToUpdate) return;
  
    // Alterna o estado de 'estaCompleta'
    const updatedDoneState = !tarefaToUpdate.estaCompleta;
  
    // Atualiza a tarefa no banco de dados
    TarefasServices.updateById(id, {
      ...tarefaToUpdate,
      estaCompleta: updatedDoneState,
    })
      .then(result => {
        if (result instanceof ApiException) {
          alert(result.message);
          console.error('Erro ao atualizar tarefa:', result.message);
        } else {
          setList(list => {
            const updatedList = list.map(item =>
              item.id === id ? { ...item, estaCompleta: updatedDoneState } : item
            );
            return updatedList;
          });
        }
      })
      .catch(error => {
        console.error('Erro ao atualizar tarefa:', error);
      });
  };


     return (
    <C.Container>
      <C.Area>
        <Tempo />
        <div>
          <Navbar />
          <Routes>
            <Route path="/nova-pagina" element={<NovaPagina />} />
          </Routes>
        </div>

        <C.Header>Lista de Tarefas </C.Header>

        <AddArea onEnter={handleAdd} />

        {list.length > 0 && list.map(item => (
          <ListItem
            key={item.id}
            item={item}
            onToggleDone={handleToggleDone}
            onRemoveTask={handleRemoveTask}
            onUpdateTask={handleUpdateTask}
          />
        ))}

        {list.length === 0 && (
          <p className="listVazia">Opps, não temos nenhuma tarefa.
            <br />Adicione alguma tarefa! 😊 </p>
        )}
      </C.Area>
    </C.Container>
  );
}

export default App;
