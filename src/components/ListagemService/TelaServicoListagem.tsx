import { useState, useEffect } from "react";
import axios from "axios";
import ModalServico from "../ModalServico/ModalServico";
import { FaEdit, FaTrash} from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import "../ListagemService/TelaServicoListagem.css";
import Navbar from "../Navbar/Navbar";

interface Servico {
  id?: string;
  name: string;
  price: number;
  timeConclusion: number;
  description: string;
  active: boolean;
  categoryId: number;
}

interface Categoria {
  id: number;
  name: string;
  active: boolean;
}

function ListaServicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroPreco, setFiltroPreco] = useState("");
  const [filtroTempo, setFiltroTempo] = useState("");
  const [filtroDescricao, setFiltroDescricao] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [exibirCadastro, setExibirCadastro] = useState(false);
  const [servicoEditando, setServicoEditando] = useState<Servico | null>(null);

  useEffect(() => {
    fetchServicos();
    fetchCategorias();
  }, []);

  const fetchServicos = async () => {
    try {
      const response = await axios.get("http://localhost:8081/task");
      setServicos(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get("http://localhost:8081/category");
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  };

  const handleEditar = (servico: Servico) => {
    setServicoEditando(servico);
    setExibirCadastro(true);
  };

  const handleExcluir = async (id?: string) => {
    if (id && window.confirm("Tem certeza que deseja excluir este serviço?")) {
      try {
        await axios.delete(`http://localhost:8081/task/${id}`);
        fetchServicos();
      } catch (error) {
        console.error("Erro ao excluir serviço", error);
      }
    }
  };

  // Filtro aplicado em vários campos
  const servicosFiltrados = servicos.filter((servico) => {
    const nomeValido = servico.name.toLowerCase().includes(filtroNome.toLowerCase());
    const precoValido = filtroPreco
      ? servico.price === Number(filtroPreco)
      : true;
    const tempoValido = filtroTempo
      ? servico.timeConclusion === Number(filtroTempo)
      : true;
    const descricaoValida = servico.description.toLowerCase().includes(filtroDescricao.toLowerCase());
    const statusValido = filtroStatus
      ? (filtroStatus === "Ativo" ? servico.active : !servico.active)
      : true;

    return nomeValido && precoValido && tempoValido && descricaoValida && statusValido;
  });

  const getCategoriaNome = (categoryId: number) => {
    const categoria = categorias.find((cat) => cat.id === categoryId);
    return categoria ? categoria.name : `ID ${categoryId}`;
  };

  return (
    <div className="pagina-com-sidebar">
      <Sidebar />
      <Navbar />

      <div className="conteudo-principal">
        <h2 className="titulo-servico">Serviços</h2>

        <div className="filtros-e-botoes">
          <div className="grupo-filtros">
            <div className="filtro-item">
              
              <input
                type="text"
                className="filtro-input"
                placeholder="Filtrar por nome"
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
              />
            </div>

            <div className="filtro-item">
              
              <input
                type="number"
                className="filtro-input"
                placeholder="Filtrar por preço"
                value={filtroPreco}
                onChange={(e) => setFiltroPreco(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            <div className="filtro-item">
              
              <input
                type="number"
                className="filtro-input"
                placeholder="Filtrar por tempo (min)"
                value={filtroTempo}
                onChange={(e) => setFiltroTempo(e.target.value)}
                min="0"
              />
            </div>

            <div className="filtro-item">
              
              <input
                type="text"
                className="filtro-input"
                placeholder="Filtrar por descrição"
                value={filtroDescricao}
                onChange={(e) => setFiltroDescricao(e.target.value)}
              />
            </div>

            <div className="filtro-item">
              
              <select
                className="filtro-select"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>

          <button
            className="addButton"
            onClick={() => {
              setServicoEditando(null);
              setExibirCadastro(true);
            }}
          >            
            + Cadastrar
          </button>
        </div>

        <ModalServico
          servicoEditando={servicoEditando}
          onCadastro={() => {
            fetchServicos();
            setExibirCadastro(false);
            setServicoEditando(null);
          }}
          onClose={() => {
            setExibirCadastro(false);
            setServicoEditando(null);
          }}
          exibir={exibirCadastro}
        />

        <table className="table table-hover bg-white">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço (R$)</th>
              <th>Tempo (min)</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {servicosFiltrados.length > 0 ? (
              servicosFiltrados.map((servico) => (
                <tr key={servico.id}>
                  <td>{servico.id}</td>
                  <td>{servico.name}</td>
                  <td>R$ {servico.price.toFixed(2)}</td>
                  <td>{servico.timeConclusion} min</td>
                  <td>{servico.description}</td>
                  <td>{servico.active ? "Ativo" : "Inativo"}</td>
                  <td>{getCategoriaNome(servico.categoryId)}</td>
                  <td>
                    <button
                      className="icon-button edit"
                      onClick={() => handleEditar(servico)}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="icon-button delete"
                      onClick={() => handleExcluir(servico.id)}
                      title="Excluir"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  Nenhum serviço encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaServicos;
