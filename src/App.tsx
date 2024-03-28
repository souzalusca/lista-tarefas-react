import React, { useState, useEffect, useCallback } from 'react';
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
    fetchData();
  }, []);

  const handleAdd = async (taskName: string) => {
    try {
      const newTaskData = {
        nomedaTarefa: taskName,
        estaCompleta: false,
        createdAt: new Date().toISOString(),
        updatedAt: '',
      };

      // Cria a nova tarefa no servidor
      const result = await TarefasServices.create(newTaskData);

      if (result instanceof ApiException) {
        alert(result.message);
        console.error('Erro ao criar tarefa:', result.message);
        return;
      }

      // Atualiza o estado da lista com a nova tarefa (incluindo o ID atribuído pelo servidor)
      setList(prevList => [...prevList, result]);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const handleRemoveTask = useCallback((id: number) => {
    TarefasServices.deleteById(id)
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
          console.error('Erro ao apagar tarefa:', result.message);
        } else {
          setList(list => list.filter(item => item.id !== id));
          console.log('Tarefa apagada com sucesso!');
        }
      });
  }, []);

  const handleUpdateTask = (id: number, name: string) => {
    
    // Cria um objeto temporário com o novo nome da tarefa e a data de atualização
    const updatedTaskData: Partial<Item> = {
      nomedaTarefa: name,
      updatedAt: new Date().toISOString()  // Atualiza a data de atualização para o momento atual
    };
  
    // Encontra a tarefa na lista
    const taskToUpdate = list.find(item => item.id === id);
    if (!taskToUpdate) {
      console.error('Tarefa não encontrada para atualização');
      return;
    }
  
    // Mescla os dados da tarefa existente com o novo nome da tarefa e a data de atualização
    const updatedTask: Item = { ...taskToUpdate, ...updatedTaskData };
  
    // Chama o serviço para atualizar a tarefa pelo ID
    TarefasServices.updateById(id, updatedTask)
      .then(result => {
        if (result instanceof ApiException) {
          alert(result.message);
          console.error('Erro ao atualizar tarefa:', result.message);
        } else {
          // Atualiza localmente a lista de tarefas com os novos dados da tarefa
          setList(list => {
            const updatedList = list.map(item =>
              item.id === id ? updatedTask : item
            );
            return updatedList;
          });
          console.log('Tarefa atualizada com sucesso!');
        }
      })
      .catch(error => {
        console.error('Erro ao atualizar tarefa:', error);
      });
  };
  
  
  
  

  const handleToggleDone = (id: number, done: boolean) => {
    const tarefaToUpdate = list.find(item => item.id === id);
    if (!tarefaToUpdate) return;

    const updatedDoneState = !tarefaToUpdate.estaCompleta;

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
