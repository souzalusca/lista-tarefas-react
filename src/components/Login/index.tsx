import React, { useState, useEffect } from "react";
import * as C from "./styles";
import { ApiException } from "../../services/api/ApiException";
import { TarefasServices } from "../../services/api/tarefas/TarefasServices";
import Navbar from "../utils/navbar";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [loggedInUserName, setLoggedInUserName] = useState("");

  useEffect(() => {
    // Recuperar o nome de usuário do sessionStorage ao carregar a página
    const storedLoggedInUserName = sessionStorage.getItem("loggedInUserName");
    if (storedLoggedInUserName) {
      setLoggedInUserName(storedLoggedInUserName);
    }
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evitar o comportamento padrão de submissão do formulário
    if (formData.email === "" || formData.senha === "") {
      alert("Preencha todos os campos");
    } else {
      try {
        const result = await TarefasServices.login(formData.email, formData.senha);
        if (result instanceof ApiException) {
          alert(result.message);
          console.error('Erro ao fazer login:', result.message);
        } else {
          // Atualiza o estado com o nome de usuário após o login bem-sucedido
          setLoggedInUserName(result.nome);
          // Armazena o nome de usuário na sessionStorage
          sessionStorage.setItem("loggedInUserName", result.nome);
          alert("Login realizado com sucesso");
          window.location.href = "/";
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert("Erro ao fazer login. Por favor, tente novamente.");
      }
    }     
  };

  // Função para alternar entre os temas
  const toggleTheme = () => {
    // Lógica para alternar entre os temas
  };

  return ( 
    <div>
      <Navbar toggleTheme={toggleTheme} loggedInUserName={loggedInUserName} onLogout={() => {}} />
      <div className="create-login">
        <C.Container>
          <div>
            <h1 className="title">Login</h1>
            <form className="form" onSubmit={handleLogin}>
              <div className="form-inputs">
                <label htmlFor="email">E-mail</label>
                <input 
                  type="email"
                  id="email" 
                  name="email" 
                  required 
                  placeholder="Digite seu e-mail" 
                  value={formData.email} 
                  onChange={ e => setFormData({ ...formData, email: e.target.value })} 
                />

                <label htmlFor="password">Senha</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  required 
                  placeholder="Digite sua senha" 
                  value={formData.senha} 
                  onChange={ e => setFormData({ ...formData, senha: e.target.value })}
                />
                <p>Não tem uma conta ? <a href="./create-login">clique aqui</a></p>
                <div>
                  <button type="submit" className="button-create">Entrar</button>
                  <button type="button" className="button-cancel">Cancelar</button>
                </div>
              </div>
            </form>
          </div>
        </C.Container>
      </div>
    </div>
  );
};

export default Login;
