import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalProduto from "@/components/ModalProduct/ModalProduct";
import Sidebar from "../Sidebar/Sidebar";
import "@/components/ListagemProduct/ListagemProduct.css";
import Navbar from "../Navbar/Navbar";

interface Produto {
  id: number;
  name: string;
  salePrice: number;
  purchasePrice: number;
  hasStock: boolean;
  active: boolean;
  categoryId: number;
}

interface Categoria {
  id: number;
  name: string;
  active: boolean;
}

function ListagemProduct() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroPreco, setFiltroPreco] = useState("");
  const [filtroCusto, setFiltroCusto] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [exibirCadastro, setExibirCadastro] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  useEffect(() => {
    fetchProdutos();
    fetchCategorias();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get<Produto[]>("http://localhost:8081/product");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get<Categoria[]>("http://localhost:8081/category");
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  };

  const handleEditar = (produto: Produto) => {
    setProdutoEditando(produto);
    setExibirCadastro(true);
  };

  const handleExcluir = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await axios.delete(`http://localhost:8081/product/${id}`);
        fetchProdutos();
      } catch (error) {
        console.error("Erro ao excluir produto", error);
      }
    }
  };

  const produtosFiltrados = produtos.filter((produto) => {
    const statusStr = produto.active ? "ativo" : "inativo";
    const condNome = produto.name.toLowerCase().includes(filtroNome.toLowerCase());
    const condPreco = filtroPreco === "" || produto.salePrice.toString().includes(filtroPreco);
    const condCusto = filtroCusto === "" || produto.purchasePrice.toString().includes(filtroCusto);
    const condStatus = filtroStatus === "" || statusStr.includes(filtroStatus.toLowerCase());
    return condNome && condPreco && condCusto && condStatus;
  });

  return (
    <div className="pagina-com-sidebar">
      <Sidebar />
      <Navbar />

      <div className="conteudo-principal">
        <h2 className="titulo-produto">Produtos</h2>

        <div className="filtros">
          <input
            type="text"
            className="input-filtro"
            placeholder="Filtrar por Nome"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />
          <input
            type="text"
            className="input-filtro"
            placeholder="Filtrar por Preço"
            value={filtroPreco}
            onChange={(e) => setFiltroPreco(e.target.value)}
          />
          <input
            type="text"
            className="input-filtro"
            placeholder="Filtrar por Custo"
            value={filtroCusto}
            onChange={(e) => setFiltroCusto(e.target.value)}
          />
          <input
            type="text"
            className="input-filtro"
            placeholder="Filtrar por Status"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          />
          
          <button
            className="btn-filtro btn-cadastrar"
            onClick={() => setExibirCadastro(true)}
          >
            + Cadastrar Produto
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

        <table className="table bg-white">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Custo</th>
              <th>Estoque</th>
              <th>Status</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => {
                const categoria = categorias.find((cat) => cat.id === produto.categoryId);
                return (
                  <tr key={produto.id}>
                    <td>{produto.name}</td>
                    <td>R${(produto.salePrice ?? 0).toFixed(2)}</td>
                    <td>R${(produto.purchasePrice ?? 0).toFixed(2)}</td>
                    <td>
                      <input type="checkbox" checked={produto.hasStock} readOnly />
                    </td>
                    <td>{produto.active ? "Ativo" : "Inativo"}</td>
                    <td>{categoria ? categoria.name : "Categoria não encontrada"}</td>
                    <td>
                      <button
                        className="btn-icone editar"
                        onClick={() => handleEditar(produto)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-icone excluir"
                        onClick={() => handleExcluir(produto.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
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
