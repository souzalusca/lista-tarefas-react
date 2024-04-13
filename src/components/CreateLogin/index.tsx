import React from "react";
import * as C from "./styles";


const CreateLogin: React.FC = () => {
    return ( 
        <div className="create-login">
        <C.Container>
        <div>
            <h1 className="title">Criar Cadastro</h1>
             
             <form className="form">
                 <div className="form-inputs">
                     <label htmlFor="name">Nome</label>
                     <input type="text" id="name" name="name" required placeholder="Digite seu nome" />
                     <label htmlFor="email">E-mail</label>
                     <input type="text" id="email" name="email" placeholder="Digite seu e-mail" />
                     <label htmlFor="password">Senha</label>
                     <input type="password" id="password" name="password" placeholder="Digite sua senha" />
                     <div>
                     <button type="submit" className="button-create">Criar</button>
                     <button type="button" className="button-cancel">Cancelar</button>
                     </div>
                 </div>
             </form>
        </div>

        </C.Container>
        </div>
    )
}

export default CreateLogin
