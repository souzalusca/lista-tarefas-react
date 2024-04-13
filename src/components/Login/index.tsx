import React from "react";
import * as C from "./styles";


const Login: React.FC = () => {
   
   

    return ( 
        <div className="create-login">
            <C.Container>
                <div>
                    <h1 className="title">Login</h1>
                    <form className="form">
                        <div className="form-inputs">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" name="email" required placeholder="Digite seu e-mail" />
                            <label htmlFor="password">Senha</label>
                            <input type="password" id="password" name="password" required placeholder="Digite sua senha" />
                        
                            <div>
                                <button type="submit" className="button-create">Entrar</button>
                                <button type="button" className="button-cancel">Cancelar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </C.Container>
        </div>
    );
};

export default Login;
