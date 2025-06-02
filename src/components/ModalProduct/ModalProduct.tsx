import { useEffect, useState } from "react";
import axios from "axios";
import "../ModalProduct/ModalProduct.css";

interface Produto {
  id: number;
  name: string;
  salePrice: number;
  purchasePrice: number;
  hasStock: boolean;
  active: boolean;
  categoryId: number;
}

interface ModalProdutoProps {
  exibir: boolean;
  onClose: () => void;
  onCadastro: () => void;
  produtoEditando: Produto | null;
}

export default function ModalProduto({
  exibir,
  onClose,
  onCadastro,
  produtoEditando,
}: ModalProdutoProps) {
  const [name, setName] = useState("");
  const [salePrice, setSalePrice] = useState<number>(0);
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [hasStock, setHasStock] = useState(false);
  const [active, setActive] = useState(false);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (produtoEditando) {
      setName(produtoEditando.name);
      setSalePrice(produtoEditando.salePrice ?? 0);
      setPurchasePrice(produtoEditando.purchasePrice ?? 0);
      setHasStock(produtoEditando.hasStock);
      setActive(produtoEditando.active);
      setCategoryId(produtoEditando.categoryId);
    } else {
      setName("");
      setSalePrice(0);
      setPurchasePrice(0);
      setHasStock(false);
      setActive(false);
      setCategoryId(0);
    }
    setErrorMsg("");
  }, [produtoEditando, exibir]);

  if (!exibir) return null;

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const produtoPayload = {
      name,
      salePrice,
      purchasePrice,
      hasStock,
      active,
      categoryId,
    };

    try {
      if (produtoEditando) {
        await axios.put(
          `http://localhost:8081/product/${produtoEditando.id}`,
          produtoPayload
        );
      } else {
        await axios.post("http://localhost:8081/product", produtoPayload);
      }
      onCadastro();
    } catch (error) {
      setErrorMsg("Erro ao salvar o produto. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-fundo">
      <div className="modal-conteudo">
        <div className="modal-header">
          <h2>{produtoEditando ? "Editar Produto" : "Cadastrar Produto"}</h2>
          <button className="fechar-modal" onClick={onClose}>X</button>
        </div>

        <form onSubmit={handleSalvar}>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            required
          />

          <label htmlFor="salePrice">Preço de venda</label>
          <input
            id="salePrice"
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(Number(e.target.value))}
            placeholder="Preço de venda"
            required
            step="0.01"
            min="0"
          />

          <label htmlFor="purchasePrice">Preço de custo</label>
          <input
            id="purchasePrice"
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value))}
            placeholder="Preço de custo"
            required
            step="0.01"
            min="0"
          />

          <label>
            <input
              type="checkbox"
              checked={hasStock}
              onChange={() => setHasStock(!hasStock)}
            />
            Tem estoque?
          </label>

          <label>
            <input
              type="checkbox"
              checked={active}
              onChange={() => setActive(!active)}
            />
            Ativo
          </label>

          <label htmlFor="categoryId">Categoria (ID)</label>
          <input
            id="categoryId"
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            placeholder="ID da Categoria"
            required
          />

          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

          <div className="modal-footer">
            <button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
