
import styled from 'styled-components';

export const Container = styled.div`
    
.pagination-list {
    display: flex;
    justify-content: center;
    list-style: none;
}
 
 .pagination-list li + li {
    margin-left: 0.5rem;
 }

 .pagination__item--active {
     background: none;
     color: ${props => props.theme.colors.text};
     font-weight: bold;
     border: none;
 }
 .pagination__item--active:focus {
     outline: none;
 }
`;
