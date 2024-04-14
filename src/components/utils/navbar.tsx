import React, { useContext, useState, useEffect } from 'react';
import * as C from './navbar.styled';
import {  NavbarList, NavbarItem, NavbarLink } from './navbar.styled';
import { ThemeContext } from 'styled-components';

interface Props {
  toggleTheme(): void;
  loggedInUserName: string;
  onLogout(): void; // Adicione a propriedade onLogout à interface Props
}

const Navbar: React.FC<Props> = ({ toggleTheme, loggedInUserName, onLogout }) => {
  const theme = useContext(ThemeContext); // Obtém o tema do contexto
  const [icon, setIcon] = useState<string>(""); // Estado para o ícone

  const handleLogout = () => {
    // Limpar os dados do usuário da sessionStorage
    sessionStorage.removeItem('loggedInUserName');
    // Chamar a função de logout
    onLogout();
  };
  // Função para alternar entre os temas light e dark
  const handleToggleTheme = () => {
    toggleTheme(); // Chama a função toggleTheme para alternar entre os temas
  };

  // Atualiza o ícone com base no tema sempre que o tema mudar
  useEffect(() => {
    if (theme?.title === 'light') {
      setIcon(" 🌛"); // Define o ícone do Sol se o tema for light
    } else {
      setIcon("☀️"); // Define o ícone da Lua se o tema for dark
    }
  }, [theme]); // Executa sempre que o tema mudar

  return (
    <C.Container>
      <NavbarList>
        <NavbarItem>
          <NavbarLink href="/">Pagina inicial</NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <NavbarLink href="/create-login">Registre-se</NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <NavbarLink href="/login">Entrar</NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <NavbarLink onClick={handleLogout}>Deslogar</NavbarLink>
        </NavbarItem>
        <NavbarItem>
        <div className="logged-in-user">Bem-vindo, {loggedInUserName}</div>
        </NavbarItem>
      </NavbarList>
      {/* Renderiza o ícone do Moon ou Sun com base no tema atual */}
      <NavbarItem>
        <NavbarLink style={{ fontSize: '24px', fontWeight: 'normal', cursor: 'pointer', textDecoration: 'none' }} onClick={handleToggleTheme}>
          {icon}
        </NavbarLink>
      </NavbarItem>
    </C.Container>
  );
};

export default Navbar;
