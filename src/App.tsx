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
import { ThemeProvider, DefaultTheme } from 'styled-components';
import lightTheme from './styles/themes/light';
import darkTheme from './styles/themes/dark';
import { usePersistedState } from './components/utils/usePersistedState';
import Pagination from './Pagination/Pagination';

interface AppProps {
  toggleTheme: () => void;
}

const App: React.FC<AppProps> = ({ toggleTheme }) => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', lightTheme);
  const [list, setList] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const LIMIT = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [loggedInUserName, setLoggedInUserName] = useState('');

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

  useEffect(() => {
    const storedLoggedInUserName = sessionStorage.getItem('loggedInUserName');
    if (storedLoggedInUserName) {
      setLoggedInUserName(storedLoggedInUserName);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUserName');
    window.location.href = '/login';
  };

  const toggleThemeLocal = () => {
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
        importancia: importance.toString()
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

  const handleUpdateTask = (id: number, newData: Partial<Item>) => {
    const updatedTaskData: Partial<Item> = {
      nomedaTarefa: newData.nomedaTarefa,
      updatedAt: new Date().toISOString(),
      importancia: newData.importancia,
      limitedAt: newData.limitedAt
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
              item.id === id ? result : item
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

  const handleFilterTasks = useCallback((searchTerm: string) => {
    setSearchTerm(searchTerm);
  }, []);

  const totalItems = list.length;
  const offset = currentPage * LIMIT;
  const visibleTasks = list.slice(offset, offset + LIMIT);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <C.Container>
      <Navbar 
              toggleTheme={toggleThemeLocal}
              onLogout={handleLogout}
              loggedInUserName={loggedInUserName}
            />
             <Tempo />
        <C.Area>
          <div>
          
            <Routes>
              <Route path="/nova-pagina" element={<NovaPagina />} />
            </Routes>
          </div>
          <C.Header>Lista de Tarefas <br /> <br /> </C.Header>
          
          <AddArea 
            onAddTask={handleAdd}
            tasks={list}
            onFilterTasks={handleFilterTasks}
          />
          {visibleTasks.map(item => (
            <ListItem
              key={item.id}
              item={item}
              onToggleDone={handleToggleDone}
              onRemoveTask={handleRemoveTask}
              onUpdateTask={handleUpdateTask}
              searchTerm={searchTerm}
            />
          ))}
        </C.Area>
        <Pagination 
          limit={LIMIT}
          total={totalItems}
          offset={offset}
          setOffset={handlePageChange}
        />
      </C.Container>
    </ThemeProvider>
  );
}

export default App;
