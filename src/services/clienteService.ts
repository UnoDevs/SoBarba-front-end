// src/services/clienteService.ts
import axios from "axios";
import { Usuario } from "../types/Usuario";

const BASE_URL = "http://localhost:8081/client";

export const clienteService = {
  // GET todos os clientes
  getClientes: async (): Promise<Usuario[]> => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  // POST novo cliente
  addCliente: async (novoCliente: Omit<Usuario, "id">): Promise<Usuario> => {
    const response = await axios.post(BASE_URL, novoCliente);
    return response.data;
  },

  // PUT editar cliente
  updateCliente: async (id: number, clienteAtualizado: Usuario): Promise<Usuario> => {
    const response = await axios.put(`${BASE_URL}/${id}`, clienteAtualizado);
    return response.data;
  },

  // DELETE cliente
  deleteCliente: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
