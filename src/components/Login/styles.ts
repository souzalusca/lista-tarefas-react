import styled from 'styled-components';

export const Container = styled.div`

    width: 100%;
    height: 100%;
    margin-top: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    
    .title {
        margin-bottom: 30px;
        color: black;
        font-weight: bold;
        font-size: 30px;
        text-align: center;

    }
    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        
        
    }
    .form-inputs {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        background-color: #f5f5f5;
        min-width: 500px;
        max-width: 500px;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

    }
    label {
        margin-bottom: 10px;
        font-weight: bold;
        color: #333;

    }
    input {
        margin-bottom: 20px;
        padding: 10px;
        border-radius: 5px;
        border: none;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 300px;
        font-size: 16px;
        color: #333;
        background-color: #f5f5f5;
        transition: all 0.3s ease; 

        &:focus {
            outline: none;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
            background-color: #fff;
            color: #333; 
        }
        
    }
    .button-create {
        margin-top: 20px;
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        background-color: #007bff;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-right: 5px;

    }
    .button-cancel {
        margin-top: 20px;
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        background-color: #dc3545;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;


    }

`