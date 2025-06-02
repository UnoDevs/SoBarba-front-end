import { useState, useEffect } from "react";
import axios from "axios";
import "../ModalServico/ModalProduct.css";


type Produto = {
  id?: number;
  name: string;
  salePrice: number;
  purchasePrice: number;
  isActive: boolean;
  hasStock: boolean;
};

type ModalProdutoProps = {
  produtoEditando?: Produto | null;
  onCadastro: () => void;
  onClose: () => void;
  exibir: boolean;
};

function ModalProduto({ produtoEditando, onCadastro, onClose, exibir }: ModalProdutoProps) {
  const produtoInicial: Produto = {
    id: undefined,
    name: "",
    salePrice: 0,
    purchasePrice: 0,
    isActive: false,
    hasStock: false,
  };

  const [formData, setFormData] = useState<Produto>(produtoInicial);

  useEffect(() => {
    if (produtoEditando) {
      setFormData(produtoEditando);
    } else {
      setFormData(produtoInicial);
    }
  }, [produtoEditando]);

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
        await axios.put(`http://localhost:8081/product/${formData.id}`, formData);
      } else {
        await axios.post("http://localhost:8081/product", formData);
      }
      setFormData(produtoInicial);
      onCadastro();
    } catch (error) {
      console.error("Erro ao salvar produto", error);
    }
  };

  if (!exibir) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{formData.id ? "Editar Produto" : "Cadastro de Produto"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="salePrice" className="form-label">Preço (R$)</label>
                <input
                  type="number"
                  className="form-control"
                  id="salePrice"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="purchasePrice" className="form-label">Custo (R$)</label>
                <input
                  type="number"
                  className="form-control"
                  id="purchasePrice"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="hasStock"
                  name="hasStock"
                  checked={formData.hasStock}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="hasStock">Disponível em Estoque</label>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="isActive">Ativo</label>
              </div>
              <button type="submit" className="btn btn-primary">Salvar</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancelar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProduto;

