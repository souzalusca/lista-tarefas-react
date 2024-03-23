export type Item = {
    id:number;
    name : string;
    done : boolean;
    createdAt: string; // Adiciona o campo createdAt
    updatedAt?: string; // Adiciona o campo updatedAt
}