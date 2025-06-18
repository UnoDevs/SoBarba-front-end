import React, { useState } from "react";
import "@/components/ListagemFinanceiro/ListagemFinanceiro.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import ModalFinanceiro from "../ModalFinanceiro/ModalFinanceiro";

interface Financeiro {
  id: number;
  data: string;
  valor: number;
  tipo: "RECEITA" | "DESPESA";
  clienteFornecedor: string;
  servicoProduto: string;
  barbeiro?: string;
  status: "Pago" | "Recebido" | "Pendente";
}

const ListagemFinanceiro: React.FC = () => {
  const [financeiros] = useState<Financeiro[]>([
    { id: 1, data: "2025-06-01T14:50", valor: 55, tipo: "DESPESA", clienteFornecedor: "Felipe dos Santos", servicoProduto: "Cáriton V.", barbeiro: "Cáriton V.", status: "Pago" },
    { id: 2, data: "2025-06-01T15:00", valor: 75, tipo: "RECEITA", clienteFornecedor: "Anderson Gomes", servicoProduto: "Degrade", barbeiro: "Filipe V.", status: "Recebido" },
    { id: 3, data: "2025-06-01T15:10", valor: 120, tipo: "RECEITA", clienteFornecedor: "Veronica dos Santos", servicoProduto: "Multiplos", barbeiro: "Filipe V.", status: "Recebido" },
    { id: 4, data: "2025-06-01", valor: 350, tipo: "DESPESA", clienteFornecedor: "COPEL", servicoProduto: "Energia", status: "Pago" },
    { id: 5, data: "2025-06-01", valor: 275, tipo: "DESPESA", clienteFornecedor: "SANEPAR", servicoProduto: "Água", status: "Pendente" },
  ]);

  const [filtroData, setFiltroData] = useState("");
  const [filtroServico, setFiltroServico] = useState("");
  const [filtroBarbeiro, setFiltroBarbeiro] = useState("");
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroValor, setFiltroValor] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [financeiroSelecionado, setFinanceiroSelecionado] = useState<Financeiro | null>(null);

  const financeirosFiltrados = financeiros.filter((fin) => {
    return (
      fin.data.includes(filtroData) &&
      fin.servicoProduto.toLowerCase().includes(filtroServico.toLowerCase()) &&
      (fin.barbeiro ? fin.barbeiro.toLowerCase().includes(filtroBarbeiro.toLowerCase()) : true) &&
      fin.clienteFornecedor.toLowerCase().includes(filtroCliente.toLowerCase()) &&
      (filtroValor === "" || fin.valor.toString().includes(filtroValor))
    );
  });

  return (
    <div className="container-financeiro">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <h2 className="titulo-financeiro">Financeiro</h2>

        <div className="financeiro-content">
          <div className="financeiro-filtros-acoes">
            <div className="filtros">
              <input type="text" className="filtro-input" placeholder="Filtrar por Data" value={filtroData} onChange={(e) => setFiltroData(e.target.value)} />
              <input type="text" className="filtro-input" placeholder="Filtrar por Serviço" value={filtroServico} onChange={(e) => setFiltroServico(e.target.value)} />
              <input type="text" className="filtro-input" placeholder="Filtrar por Barbeiro" value={filtroBarbeiro} onChange={(e) => setFiltroBarbeiro(e.target.value)} />
              <input type="text" className="filtro-input" placeholder="Filtrar por Cliente" value={filtroCliente} onChange={(e) => setFiltroCliente(e.target.value)} />
              <input type="text" className="filtro-input" placeholder="Filtrar por Valor" value={filtroValor} onChange={(e) => setFiltroValor(e.target.value)} />
            </div>

            <div className="acoes">
              <button 
                className="btn-cadastrar"
                onClick={() => {
                  setFinanceiroSelecionado(null);
                  setIsModalOpen(true);
                }}
              >
                + Cadastrar
              </button>
            </div>
          </div>

          <table className="table bg-white">
            <thead>
              <tr>
                <th>Data</th>
                <th>Valor</th>
                <th>Tipo</th>
                <th>Cliente/Fornecedor</th>
                <th>Barbeiro</th>
                <th>Serviço/Prod.</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {financeirosFiltrados.map((fin) => (
                <tr key={fin.id}>
                  <td>{new Date(fin.data).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
                  <td>R$ {fin.valor.toFixed(2)}</td>
                  <td className={fin.tipo === "DESPESA" ? "despesa" : "receita"}>{fin.tipo}</td>
                  <td>{fin.clienteFornecedor}</td>
                  <td>{fin.barbeiro || "-"}</td>
                  <td>{fin.servicoProduto}</td>
                  <td><span className={`status ${fin.status.toLowerCase()}`}>{fin.status}</span></td>
                  <td>
                    <div className="acoes-botoes">
                      <button className="icon-button edit">
                        <FiEdit />
                      </button>
                      <button className="icon-button delete">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalFinanceiro
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => {}}
        financeiroSelecionado={financeiroSelecionado}
      />
    </div>
  );
};

export default ListagemFinanceiro;
