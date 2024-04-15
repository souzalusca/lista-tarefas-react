import React, { useState } from "react";
import * as C from "./styles";
import { TarefasServices } from "../../services/api/tarefas/TarefasServices";
import { ApiException } from "../../services/api/ApiException";
import { useNavigate } from "react-router-dom"; // Importe useNavigate
import Navbar from "../utils/navbar";
import lightTheme from "../../styles/themes/light";
import darkTheme from '../../styles/themes/dark';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { usePersistedState } from "../utils/usePersistedState";

const CreateLogin: React.FC = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loggedInUserName, setLoggedInUserName] = useState("");
    const navigate = useNavigate(); // Use useNavigate para navegação programática
    const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', lightTheme);

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const handleUserEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserEmail(event.target.value);
    };

    const handleUserPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserPassword(event.target.value);
    };

    const addUsuario = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior
        setErrorMessage(""); // Clear any previous error message
        try {
            // Check if user with the same email already exists
            const existingUser = await TarefasServices.getUserByEmail(userEmail);
            if (existingUser) {
                setErrorMessage("Usuário com este email já existe.");
            } else {
                // Create new user if email is not found
                const result = await TarefasServices.cadastrousuario({ nome: userName, email: userEmail, senha: userPassword });
                // Clear input fields only if user creation was successful
                if (!(result instanceof ApiException)) {
                    setUserName("");
                    setUserEmail("");
                    setUserPassword("");
                    setErrorMessage('Usuário criado com sucesso.');
                    // Redirecionar para outra página após criar o usuário
                    navigate("/");
                } else {
                    setErrorMessage("Erro ao criar usuário. Por favor, tente novamente.");
                }
            }
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            setErrorMessage("Erro ao criar usuário. Por favor, tente novamente.");
        }
    };

      // Função para alternar entre os temas
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === lightTheme ? darkTheme : lightTheme);
  };


    return ( 
        <ThemeProvider theme={theme}>
        <div className="create-login">
             <Navbar toggleTheme={toggleTheme} loggedInUserName={loggedInUserName} onLogout={() => {}} />
            <C.Container>
                <div>
                    <h1 className="title">Criar Cadastro</h1>
                    <form className="form" onSubmit={addUsuario}>
                        <div className="form-inputs">
                            <label htmlFor="name">Nome</label>
                            <input type="text" id="name" name="name" value={userName} onChange={handleUserNameChange} required placeholder="Digite seu nome" />
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" name="email" value={userEmail} onChange={handleUserEmailChange} required placeholder="Digite seu e-mail" />
                            <label htmlFor="password">Senha</label>
                            <input type="password" id="password" name="password" value={userPassword} onChange={handleUserPasswordChange} required placeholder="Digite sua senha" />
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <div>
                                <button type="submit" className="button-create">Criar</button>
                                <button type="button" className="button-cancel">Cancelar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </C.Container>
        </div>
        </ThemeProvider>
    );
};

export default CreateLogin;
