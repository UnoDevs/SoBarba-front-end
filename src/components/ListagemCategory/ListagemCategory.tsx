import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalCategory from "../ModalCategory/ModalCategory";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "../ListagemCategory/ListagemCategory.css";

interface Categoria {
  id: number;
  name: string;
  active: boolean;
}

export default function ListagemCategory() {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);
  const [loading, setLoading] = useState(false);

  const carregarCategorias = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8081/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const abrirModalCadastro = () => {
    setCategoriaEditando(null);
    setModalVisivel(true);
  };

  const abrirModalEdicao = (categoria: Categoria) => {
    setCategoriaEditando(categoria);
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
  };

  const aoCadastrarOuEditar = () => {
    fecharModal();
    carregarCategorias();
  };

  const handleExcluir = async (id: number) => {
    if (!window.confirm("Deseja realmente excluir esta categoria?")) return;

    try {
      await axios.delete(`http://localhost:8081/category/${id}`);
      carregarCategorias();
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
    }
  };

  return (
    <div className="pagina-com-sidebar">
      <Sidebar />
      <Navbar />
      <div className="conteudo-principal">
        <h1 className="titulo-category">Categorias</h1>

        <div className="linha-controles">
          <button className="btn btn-outline-dark cadastrar-btn" onClick={abrirModalCadastro}>
            + Cadastrar
          </button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table className="table table-hover bg-white">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Ativo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.id}</td>
                    <td>{cat.name}</td>
                    <td>{cat.active ? "Ativo" : "Inativo"}</td>
                    <td>
                      <button className="icon-button edit" onClick={() => abrirModalEdicao(cat)}>
                        <FaEdit />
                      </button>
                      <button className="icon-button delete" onClick={() => handleExcluir(cat.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    Nenhuma categoria encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <ModalCategory
          exibir={modalVisivel}
          onClose={fecharModal}
          onCadastro={aoCadastrarOuEditar}
          categoryEditando={categoriaEditando}
        />
      </div>
    </div>
  );
}
