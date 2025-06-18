import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

export interface Financeiro {
  id?: number;
  data: string;
  valor: number;
  tipo: "RECEITA" | "DESPESA";
  clienteFornecedor: string;
  servicoProduto: string;
  status: "Pago" | "Recebido" | "Pendente";
}

interface ModalFinanceiroProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void; // callback para atualizar lista no pai
  financeiroSelecionado: Financeiro | null;
}

const initialFinanceiro = (): Financeiro => ({
  data: "",
  valor: 0,
  tipo: "RECEITA",
  clienteFornecedor: "",
  servicoProduto: "",
  status: "Pendente",
});

const ModalFinanceiro: React.FC<ModalFinanceiroProps> = ({
  isOpen,
  onClose,
  onSave,
  financeiroSelecionado,
}) => {
  const [financeiro, setFinanceiro] = useState<Financeiro>(initialFinanceiro());
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (financeiroSelecionado) {
      setFinanceiro(financeiroSelecionado);
    } else {
      setFinanceiro(initialFinanceiro());
    }
    setErrorMsg("");
  }, [financeiroSelecionado, isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "valor") {
      setFinanceiro({ ...financeiro, valor: value === "" ? 0 : Number(value) });
    } else {
      setFinanceiro({ ...financeiro, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      if (financeiro.id) {
        await axios.put(`http://localhost:8081/financeiro/${financeiro.id}`, financeiro);
      } else {
        await axios.post("http://localhost:8081/financeiro", financeiro);
      }
      onSave();
      onClose();
    } catch (error) {
      setErrorMsg("Erro ao salvar. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-fundo">
      <div className="modal-conteudo">
        <h2>{financeiroSelecionado ? "Editar Financeiro" : "Cadastrar Financeiro"}</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="data">Data e Hora</label>
          <input
            id="data"
            type="datetime-local"
            name="data"
            value={financeiro.data}
            onChange={handleChange}
            required
          />

          <label htmlFor="valor">Valor</label>
          <input
            id="valor"
            type="number"
            name="valor"
            value={financeiro.valor}
            onChange={handleChange}
            placeholder="Valor"
            step="0.01"
            min="0"
            required
          />

          <label htmlFor="tipo">Tipo</label>
          <select
            id="tipo"
            name="tipo"
            value={financeiro.tipo}
            onChange={handleChange}
            required
          >
            <option value="RECEITA">RECEITA</option>
            <option value="DESPESA">DESPESA</option>
          </select>

          <label htmlFor="clienteFornecedor">Cliente/Fornecedor</label>
          <input
            id="clienteFornecedor"
            type="text"
            name="clienteFornecedor"
            value={financeiro.clienteFornecedor}
            onChange={handleChange}
            placeholder="Cliente/Fornecedor"
            required
          />

          <label htmlFor="servicoProduto">Serviço/Produto</label>
          <input
            id="servicoProduto"
            type="text"
            name="servicoProduto"
            value={financeiro.servicoProduto}
            onChange={handleChange}
            placeholder="Serviço/Produto"
            required
          />

          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={financeiro.status}
            onChange={handleChange}
            required
          >
            <option value="Pago">Pago</option>
            <option value="Recebido">Recebido</option>
            <option value="Pendente">Pendente</option>
          </select>

          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

          <div className="modal-footer">
              <button type="submit" disabled={loading}>
                  {loading ? "Salvando..." : "Cadastrar"}
                </button>
                <button
                type="button"
                onClick={onClose}
                disabled={loading}
                style={{ marginLeft: 10 }}
              >
                Cancelar
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFinanceiro;
