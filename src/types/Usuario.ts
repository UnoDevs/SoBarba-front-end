export interface Usuario {
    id: number;
    name: string;
    description: string;
    birthDate: string;
    email: string;
    phone: string;
    active: boolean;
    cpf: string;
    tipo: "cliente" | "funcionario"; // Definição correta do tipo para 'tipo';
}
