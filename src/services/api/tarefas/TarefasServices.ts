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

const getAll = async (): Promise<Item[] | ApiException> => {
    try {
    const { data } = await Api().get('/tarefas');
    return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao buscar tarefas');
    }
  };

const getById = async (id: number): Promise<Item | ApiException> => {
    try {
        const { data } = await Api().get(`/tarefas/${id}`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao buscar tarefas');
    }
};

const create = async (dataToCreate: Omit<Item, 'id' | 'updatedAt'  >): Promise<Item | ApiException> => {
    try {
        const { data } = await Api().post('/tarefas', dataToCreate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao criar tarefa');
    }
};

const updateById = async (id: number, dataToUpdate: Item): Promise<Item | ApiException> => {
    try {
        const { data } = await Api().put(`/tarefas/${id}`, dataToUpdate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao atualizar a tarefa.');
    }
};

const deleteById = async (id: number): Promise<undefined | ApiException> => {
    try {
        await Api().delete(`/tarefas/${id}`);
        return undefined;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao apagar o registro');
    }
};

export const TarefasServices = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};
