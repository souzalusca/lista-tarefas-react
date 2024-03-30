import styled from "styled-components";

export const Container = styled.div`

    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    min-height: 100vh;

`;

export const Area = styled.div`
margin: auto;
max-width: 980px; 
padding: 10px;


.listVazia{
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-top: 80px;
  font-size: 22px; 
  font-style: normal;
  font-family: Arial, Helvetica, sans-serif;

}
NavBar{
  background-color: #20212C;
  border-radius: 10px;
  padding: 10px;
  margin: 20px 0;
  display: inline-block;
}
  

`;

export const Header = styled.h1`
    margin: 0 0 50px;
    padding: 0;
    color: ${props => props.theme.colors.text};
    text-align: center;
    border-bottom: 1px solid #444;
    padding-bottom: 20px;

    

`;