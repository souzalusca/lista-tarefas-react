import styled from 'styled-components';

// Exportações adicionais, se houver
export const Container = styled.nav`
  padding: 20px; /* Espaçamento interno */
  margin-bottom: 50px;
  margin-top: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
  
`;

export const NavbarList = styled.ul`
  list-style-type: none; /* Remove os marcadores de lista */
  margin: 0; /* Remove as margens padrão */
  padding: 0; /* Remove o preenchimento padrão */
`;

export const NavbarItem = styled.li`
  display: inline-block; /* Exibir itens em linha */
  margin-right: 30px; /* Espaçamento entre os itens */
`;

export const NavbarLink = styled.a`
  
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none; /* Remova o sublinhado padrão */

  &:hover {
    text-decoration: underline; /* Adiciona sublinhado ao passar o mouse */
  }
`;
