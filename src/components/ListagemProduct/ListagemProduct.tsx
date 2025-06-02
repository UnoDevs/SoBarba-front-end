import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import ModalProduto from "@/components/ModalProduct/ModalProduct";
// import Sidebar from "../Sidebar/Sidebar"; // Caso queira habilitar futuramente
import"@/components/ModalProduct/ModalProduct.css";

// ✅ Definição do tipo Produto
interface Produto {
  id: number;
  name: string;
  salePrice: number;
  purchasePrice: number;
  hasStock: boolean;
  isActive: boolean;
}

function ListagemProduct() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [termoBusca, setTermoBusca] = useState<string>("");
  const [exibirCadastro, setExibirCadastro] = useState<boolean>(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get<Produto[]>("http://localhost:8081/product");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  };

  const handleEditar = (produto: Produto) => {
    setProdutoEditando(produto);
    setExibirCadastro(true);
  };

  const handleExcluir = async (id: number) => {
    if (id && window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await axios.delete(`http://localhost:8081/product/${id}`);
        fetchProdutos();
      } catch (error) {
        console.error("Erro ao excluir produto", error);
      }
    }
  };

  const produtosFiltrados = produtos.filter((produto) =>
    produto.name.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="pagina-com-sidebar">
      {/* <Sidebar /> Caso queira habilitar futuramente */}

      <div className="conteudo-principal">
        <h2 className="titulo-produto">Produtos</h2>

        <div className="topo-produto">
          <button className="btn btn-outline-dark">Adicionar Filtro ▼</button>

          <div className="pesquisa-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="form-control pesquisa-input"
              placeholder="Pesquisar..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>

          <button
            className="btn btn-outline-dark"
            onClick={() => setExibirCadastro(true)}
          >
            Cadastrar Produto
          </button>
        </div>

        <ModalProduto
          produtoEditando={produtoEditando}
          onCadastro={() => {
            fetchProdutos();
            setExibirCadastro(false);
            setProdutoEditando(null);
          }}
          onClose={() => {
            setExibirCadastro(false);
            setProdutoEditando(null);
          }}
          exibir={exibirCadastro}
        />

        <table className="table table-hover bg-white">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Custo</th>
              <th>Estoque</th>
              <th>Ativo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.name}</td>
                  <td>R${produto.salePrice.toFixed(2)}</td>
                  <td>R${produto.purchasePrice.toFixed(2)}</td>
                  <td>
                    <input type="checkbox" checked={produto.hasStock} readOnly />
                  </td>
                  <td>
                    <input type="checkbox" checked={produto.isActive} readOnly />
                  </td>
                  <td>
                    <button
                      className="icon-button edit"
                      onClick={() => handleEditar(produto)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="icon-button delete"
                      onClick={() => handleExcluir(produto.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Nenhum produto encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListagemProduct;

