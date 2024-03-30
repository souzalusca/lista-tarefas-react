import React, { useContext, useState, useEffect } from 'react';
import { NavbarContainer, NavbarList, NavbarItem, NavbarLink } from './navbar.styled';
import { ThemeContext } from 'styled-components';

interface Props {
  toggleTheme(): void;
}

const Navbar: React.FC<Props> = ({ toggleTheme }) => {
  const theme = useContext(ThemeContext); // Obtém o tema do contexto
  const [icon, setIcon] = useState<string>(""); // Estado para o ícone

  // Função para alternar entre os temas light e dark
  const handleToggleTheme = () => {
    toggleTheme(); // Chama a função toggleTheme para alternar entre os temas
  };

  // Atualiza o ícone com base no tema sempre que o tema mudar
  useEffect(() => {
    if (theme?.title === 'light') {
      setIcon(" 🌑"); // Define o ícone do Sol se o tema for light
      console.log("Sol");
    } else {
      setIcon("☀️"); // Define o ícone da Lua se o tema for dark
      console.log("Lua");
    }
  }, [theme]); // Executa sempre que o tema mudar

  return (
    <NavbarContainer>
      <NavbarList>
        <NavbarItem>
          <NavbarLink href="#">Pagina inicial</NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <NavbarLink href="#">Atualizar status</NavbarLink>
        </NavbarItem>
        {/* Adicione mais itens conforme necessário */}
      </NavbarList>
      {/* Renderiza o ícone do Moon ou Sun com base no tema atual */}
      <NavbarItem>
        <NavbarLink onClick={handleToggleTheme}>
          
          {icon}
        </NavbarLink>
      </NavbarItem>
    </NavbarContainer>
  );
};

export default Navbar;
