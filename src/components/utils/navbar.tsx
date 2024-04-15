// Navbar.tsx
import React, { useContext, useState, useEffect } from 'react';
import * as C from './navbar.styled';
import { NavbarList, NavbarItem, NavbarLink } from './navbar.styled';
import { ThemeContext } from 'styled-components';
import lightTheme from '../../styles/themes/light';
import darkTheme from '../../styles/themes/dark';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { usePersistedState } from "../utils/usePersistedState";

interface Props {
  toggleTheme(): void;
  loggedInUserName: string;
  onLogout(): void;
}

const Navbar: React.FC<Props> = ({ toggleTheme, loggedInUserName, onLogout }) => {
  const [icon, setIcon] = useState<string>("");
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', lightTheme);

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUserName');
    onLogout();
  };

  const handleToggleTheme = () => {
    setTheme(prevTheme => prevTheme === lightTheme ? darkTheme : lightTheme);
    toggleTheme(); // Chama a função toggleTheme do App para garantir a atualização instantânea do tema
  };

  useEffect(() => {
    if (theme?.title === 'light') {
      setIcon(" 🌛");
    } else {
      setIcon("☀️");
    }
  }, [theme]);

  return (
    <C.Container>
      <ThemeProvider theme={theme}>
        <NavbarList>
          <NavbarItem>
            <NavbarLink href="/">Pagina inicial</NavbarLink>
          </NavbarItem>
          {loggedInUserName === '' && (
            <React.Fragment>
              <NavbarItem>
                <NavbarLink href="/create-login">Registre-se</NavbarLink>
              </NavbarItem>
              <NavbarItem>
                <NavbarLink href="/login">Entrar</NavbarLink>
              </NavbarItem>
            </React.Fragment>
          )}
          {loggedInUserName !== '' && (
            <React.Fragment>
              <NavbarItem>
                <NavbarLink onClick={handleLogout}>Deslogar</NavbarLink>
              </NavbarItem>
              <NavbarItem>
                <div className="logged-in-user">Bem-vindo!  {loggedInUserName}</div>
              </NavbarItem>
            </React.Fragment>
          )}
        </NavbarList>
        <NavbarItem>
          <NavbarLink className='theme' style={{ fontSize: '24px', fontWeight: 'normal', cursor: 'pointer', textDecoration: 'none' }} onClick={handleToggleTheme}>
            {icon}
          </NavbarLink>
        </NavbarItem>
      </ThemeProvider>
    </C.Container>
  );
};

export default Navbar;
