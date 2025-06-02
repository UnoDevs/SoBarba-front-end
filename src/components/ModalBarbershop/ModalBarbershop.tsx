import { useState, useEffect } from "react";
import axios from "axios";
import "./ModalBarbershop.css";

type Barbershop = {
  id?: number;
  name: string;
  description: string;
  cnpj: string;
  active: boolean;
};

interface ModalBarbershopProps {
  barbeariaEditando: Barbershop | null;
  exibir: boolean;
  onClose: () => void;
  onCadastro: () => void;
}

function ModalBarbershop({
  barbeariaEditando,
  exibir,
  onClose,
  onCadastro,
}: ModalBarbershopProps) {
  const inicial: Barbershop = {
    name: "",
    description: "",
    cnpj: "",
    active: false,
  };

  const [barbearia, setBarbearia] = useState<Barbershop>(inicial);

  useEffect(() => {
    if (exibir) {
      if (barbeariaEditando) {
        setBarbearia(barbeariaEditando);
      } else {
        setBarbearia(inicial);
      }
    }
  }, [exibir, barbeariaEditando]); // Importante monitorar "exibir" também

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBarbearia((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (barbearia.id) {
        await axios.put(`http://localhost:8081/barbershop/${barbearia.id}`, barbearia);
      } else {
        await axios.post("http://localhost:8081/barbershop", barbearia);
      }
      onCadastro();
    } catch (error) {
      console.error("Erro ao salvar barbearia", error);
    }
  };

  if (!exibir) return null;

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" style={{ color: "#000000" }}>
              {barbearia.id ? "Editar Barbearia" : "Cadastrar Barbearia"}
            </h2>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nome:</label>
                <input
                  type="text"
                  name="name"
                  value={barbearia.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descrição:</label>
                <input
                  type="text"
                  name="description"
                  value={barbearia.description}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">CNPJ:</label>
                <input
                  type="text"
                  name="cnpj"
                  value={barbearia.cnpj}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  name="active"
                  checked={barbearia.active}
                  onChange={handleChange}
                  className="form-check-input"
                  id="activeCheck"
                />
                <label className="form-check-label" htmlFor="activeCheck">
                  Ativo
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                {barbearia.id ? "Atualizar" : "Cadastrar"}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalBarbershop;
