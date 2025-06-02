import { useState, useEffect } from "react";
import "../ModalServico/ModalServico.css";
import { Servico } from "../../types/Servico";

interface ModalServicoProps {
  exibir: boolean;
  servicoEditando: Servico | null;
  onClose: () => void;
  onCadastro: () => void;
}

function ModalServico({ exibir, servicoEditando, onClose, onCadastro }: ModalServicoProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [timeConclusion, setTimeConclusion] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(false);  // Inicia como false
  const [categoryId, setCategoryId] = useState<number>(0); 

  useEffect(() => {
    if (servicoEditando) {
      setName(servicoEditando.name);
      setPrice(servicoEditando.price);
      setTimeConclusion(servicoEditando.timeConclusion);
      setDescription(servicoEditando.description);
      setActive(servicoEditando.active);
      setCategoryId(servicoEditando.categoryId);
    } else {
      // limpa formulário para novo cadastro
      setName("");
      setPrice(0);
      setTimeConclusion(0);
      setDescription("");
      setActive(false);  // Checkbox inicia desmarcado no cadastro novo
      setCategoryId(0);
    }
  }, [servicoEditando, exibir]);

  if (!exibir) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const servico = {
      name,
      price,
      timeConclusion,
      description,
      active,
      categoryId
    };

    try {
      if (servicoEditando && servicoEditando.id) {
        // editar serviço
       await fetch(`http://localhost:8081/task/${servicoEditando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servico),
    });
      } else {
        // novo serviço
        await fetch("http://localhost:8081/task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(servico),
        });
      }
      onCadastro();
    } catch (error) {
      console.error("Erro ao salvar serviço", error);
      alert("Erro ao salvar serviço");
    }
  };

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="title-servico">{servicoEditando ? "Editar Serviço" : "Cadastrar Serviço"}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Preço (R$)</label>
            <input
              type="number"
              step="0.01"
              value={price}
              required
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Tempo de Conclusão (min)</label>
            <input
              type="number"
              value={timeConclusion}
              required
              onChange={(e) => setTimeConclusion(parseInt(e.target.value))}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <textarea
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Categoria ID</label>
            <input
              type="number"
              value={categoryId}
              required
              onChange={(e) => setCategoryId(parseInt(e.target.value))}
              className="form-control"
            />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={active}
                onChange={() => setActive(!active)}
              />
              Ativo
            </label>
          </div>
          <div className="botoes-modal">
            <button type="submit" className="btn btn-primary">
              {servicoEditando ? "Salvar" : "Cadastrar"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalServico;