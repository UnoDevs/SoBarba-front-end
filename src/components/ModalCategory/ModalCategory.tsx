import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ModalCategory/ModalCategory.css";

export interface Categoria {
  id: number;
  name: string;
  active: boolean;
}

interface ModalCategoryProps {
  exibir: boolean;
  onClose: () => void;
  onCadastro: () => void;
  categoryEditando: Categoria | null;
}

export default function ModalCategory({
  exibir,
  onClose,
  onCadastro,
  categoryEditando,
}: ModalCategoryProps) {
  const [name, setName] = useState("");
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (categoryEditando) {
      setName(categoryEditando.name);
      setActive(categoryEditando.active);
    } else {
      setName("");
      setActive(false);
    }
    setErrorMsg("");
  }, [categoryEditando, exibir]);

  if (!exibir) return null;

  const handleSalvar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const categoriaPayload = {
      name,
      active,
    };

    try {
      if (categoryEditando) {
        await axios.put(
          `http://localhost:8081/category/${categoryEditando.id}`,
          categoriaPayload
        );
      } else {
        await axios.post("http://localhost:8081/category", categoriaPayload);
      }
      onCadastro();
    } catch (error) {
      setErrorMsg("Erro ao salvar a categoria. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Cabeçalho */}
          <div className="modal-header">
            <h2 className="modal-title" style={{ color: "#000000" }}>
              {categoryEditando ? "Editar Categoria" : "Cadastrar Categoria"}
            </h2>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Formulário dentro do corpo */}
          <form onSubmit={handleSalvar}>
            <div className="modal-body">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome da Categoria"
                className="form-control"
                required
              />

              <div className="form-check mt-3">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => setActive(!active)}
                  className="form-check-input"
                  id="ativoCheck"
                />
                <label className="form-check-label" htmlFor="ativoCheck">
                  Ativo
                </label>
              </div>

              {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
            </div>

            {/* Rodapé com botões */}
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
