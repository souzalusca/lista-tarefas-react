import styled from "styled-components";

export const Container = styled.div`
     

.backgroundModal {
    background-color: pink;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 30%;
    height: 50%;
    justify-self: center;
    margin-top: 150px;
    border-radius: 10px;

}
.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
    
    
    
}
label{
    color: black;
    font-size: 20px;
    margin: 10px;
    padding: 10px;
    
}
.input-tarefa {
    border-radius: 6px;
    padding: 5px;
    text-align: center;
    background-color:rgb(249, 222, 222);

}
.input-date {
    border-radius: 6px;
    padding: 5px;
    text-align: center;
    background-color:rgb(249, 222, 222);
    
}
.select {
    border-radius: 6px; 
    padding: 5px;
    text-align: center;
    background-color:rgb(249, 222, 222);

}
.title {
    color: black;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 10px;
    
}
.buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.buttonAdd{
    background-color: rgb(97, 178, 200);
    color: white;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    
}
.buttonCancel{
    background-color: #d9364a;
    color: white;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;

}

`