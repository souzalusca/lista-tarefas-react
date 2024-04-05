// App.tsx

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
import { ThemeProvider } from 'styled-components';
import lightTheme from './styles/themes/light';
import darkTheme from './styles/themes/dark';

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [list, setList] = useState<Item[]>([]);

  const fetchData = async () => {
    try {
      const result = await TarefasServices.getAll();
      if (result instanceof ApiException) {
        alert(result.message);
        console.error('Erro ao buscar tarefas:', result.message);
      } else if (Array.isArray(result)) {
        setList(result);
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

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === lightTheme ? darkTheme : lightTheme);
  };

  const handleAdd = async (taskName: string, dueDate: string, importance: string) => {
    try {
      const newTaskData = {
        nomedaTarefa: taskName,
        estaCompleta: false,
        createdAt: new Date().toISOString(),
        updatedAt: '',
        limitedAt: dueDate,
        importancia: importance.toString() // Definindo importancia como número
      };
  
      const result = await TarefasServices.create(newTaskData);
  
      if (result instanceof ApiException) {
        alert(result.message);
        console.error('Erro ao criar tarefa:', result.message);
        return;
      }
  
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
    const updatedTaskData: Partial<Item> = {
      nomedaTarefa: name,
      updatedAt: new Date().toISOString()
    };

    const taskToUpdate = list.find(item => item.id === id);
    if (!taskToUpdate) {
      console.error('Tarefa não encontrada para atualização');
      return;
    }

    const updatedTask: Item = { ...taskToUpdate, ...updatedTaskData };

    TarefasServices.updateById(id, updatedTask)
      .then(result => {
        if (result instanceof ApiException) {
          alert(result.message);
          console.error('Erro ao atualizar tarefa:', result.message);
        } else {
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
    <ThemeProvider theme={theme}>
      <C.Container>
        <C.Area>
          <Tempo />
          <div>
            <Navbar toggleTheme={toggleTheme}/>
            <Routes>
              <Route path="/nova-pagina" element={<NovaPagina />} />
            </Routes>
          </div>

          <C.Header>Lista de Tarefas <br /> <br /> </C.Header>

          <AddArea onAddTask={handleAdd} />

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
            <p className="listVazia">Oops, não temos nenhuma tarefa.
              <br />Adicione alguma tarefa! 😊 </p>
          )}
          
        </C.Area>
      </C.Container>
    </ThemeProvider>
  );
}

export default App;
