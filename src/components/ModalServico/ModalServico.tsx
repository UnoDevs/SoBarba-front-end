import { useState, useEffect } from "react";
import axios from "axios";
import "../ModalServico/ModalServico.css";

interface Servico {
  id?: string;
  name: string;
  price: number;
  timeConclusion: number;
  description: string;
  isActive: boolean;
}

interface CadastroServicoProps {
  servicoEditando?: Servico | null;
  onCadastro: () => void;
  onClose: () => void;
  exibir: boolean;
}

function CadastroServico({ servicoEditando, onCadastro, onClose, exibir }: CadastroServicoProps) {
  const servicoInicial: Servico = { name: "", price: 0, timeConclusion: 0, description: "", isActive: false };
  
  const [formData, setFormData] = useState<Servico>(servicoInicial);

  useEffect(() => {
    if (servicoEditando) {
      setFormData(servicoEditando);
    } else {
      setFormData(servicoInicial);
    }
  }, [servicoEditando]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(`http://localhost:8081/task/${formData.id}`, formData);
      } else {
        await axios.post("http://localhost:8081/task", formData);
      }
      setFormData(servicoInicial); // Reseta o formulário após o cadastro
      onCadastro();
    } catch (error) {
      console.error("Erro ao salvar serviço", error);
    }
  };

  if (!exibir) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{formData.id ? "Editar Serviço" : "Cadastro de Serviço"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">nome do Serviço</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Digite o nome do serviço"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Preço (R$)</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="Digite o preço do serviço"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tempo (min)</label>
                <input
                  type="number"
                  className="form-control"
                  name="timeConclusion"
                  value={formData.timeConclusion}
                  onChange={handleChange}
                  required
                  placeholder="Digite o timeConclusion estimado (em minutos)"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descrição</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Descreva o serviço"
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <label className="form-check-label">Ativo</label>
              </div>
              <button type="submit" className="btn btn-cadastrar">Cadastrar</button>
              <button type="button" className="btn btn-cancelar ms-2" onClick={onClose}>Cancelar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroServico;
