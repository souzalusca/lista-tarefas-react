import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

export type Item = {
    id: number;
    nomedaTarefa: string;
    estaCompleta: boolean;
    createdAt: string;
    updatedAt: string;
    limitedAt: string;
    importancia: string;
};
export type Registro = {
    id: number;
    nome : string;
    email : string;
    senha : string;
    createdAt: string;

}

const getAll = async (): Promise<Item[] | ApiException> => {
    try {
        const { data } = await Api().get('/tarefas');
        return data;
    } catch (error) {
        return new ApiException((error as Error).message || 'Erro ao buscar tarefas');
    }
};

const getById = async (id: number): Promise<Item | ApiException> => {
    try {
        const { data } = await Api().get(`/tarefas/${id}`);
        return data;
    } catch (error) {
        return new ApiException((error as Error).message || 'Erro ao buscar tarefas');
    }
};

const create = async (dataToCreate: Omit<Item, 'id' | 'updatedAt'>): Promise<Item | ApiException> => {
    try {
        const { data } = await Api().post('/tarefas', dataToCreate);
        return data;
    } catch (error) {
        return new ApiException((error as Error).message || 'Erro ao criar tarefa');
    }
};

const updateById = async (id: number, dataToUpdate: Partial<Item>): Promise<Item | ApiException> => {
    try {
        const { data } = await Api().put(`/tarefas/${id}`, dataToUpdate);
        return data;
    } catch (error) {
        return new ApiException((error as Error).message || 'Erro ao atualizar a tarefa.');
    }
};

const deleteById = async (id: number): Promise<undefined | ApiException> => {
    try {
        await Api().delete(`/tarefas/${id}`);
        return undefined;
    } catch (error) {
        return new ApiException((error as Error).message || 'Erro ao apagar o registro');
    }
};
const cadastrousuario = async (dataToCreate: Omit<Registro, 'id' | 'createdAt'>): Promise<Registro | ApiException> => {
    try {
        const { data } = await Api().post('/cadastrousuario', dataToCreate);
        return data;
    } catch (error) {
        return new ApiException((error as Error).message || 'Erro ao criar o cadastro');
    }
}
const getUserByEmail = async (email: string): Promise<Registro | null> => {
    try {
        const { data } = await Api().get(`/cadastrousuario?email=${email}`);
        // Retorna o primeiro usuário encontrado ou null se nenhum for encontrado
        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error('Erro ao buscar usuário por email:', error);
        return null;
    }
};
const getUserBySenha = async (senha: string): Promise<Registro | null> => {
    try {
        const { data } = await Api().get(`/cadastrousuario?senha=${senha}`);
        // Retorna o primeiro usuário encontrado ou null se nenhum for encontrado
        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error('Erro ao buscar usuário pela senha:', error);
        return null;
    }
};
const login = async (email: string, senha: string): Promise<Registro | ApiException> => {
    try {
        // Busca o usuário pelo email
        const user = await getUserByEmail(email);

        // Verifica se o usuário foi encontrado e se a senha corresponde
        if (user && user.senha === senha) {
            // Se corresponder, retorna o usuário
            return user;
        } else {
            // Se não corresponder, lança uma exceção com a mensagem de erro
            throw new ApiException('E-mail ou senha incorretos.');
        }
    } catch (error) {
        // Se ocorrer um erro durante a busca do usuário, retorna uma ApiException com a mensagem de erro
        return new ApiException((error as Error).message || 'Erro ao fazer login');
    }
};




export const TarefasServices = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
    cadastrousuario,
    getUserByEmail,
    getUserBySenha,
    login
};
