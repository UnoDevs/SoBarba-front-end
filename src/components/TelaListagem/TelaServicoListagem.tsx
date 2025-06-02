import { useState, useEffect } from "react";
import axios from "axios";
import ModalServico from "../ModalServico/ModalServico";
import { FaEdit, FaTrash, FaSearch, FaTools } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import "/src/components/TelaListagem/TelaServicoListagem.css";


interface Servico {
  id?: string;
  name: string;
  price: number;
  timeConclusion: number;
  description: string;
  isActive: boolean;
}

function ListaServicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [exibirCadastro, setExibirCadastro] = useState(false);
  const [servicoEditando, setServicoEditando] = useState<Servico | null>(null);

  useEffect(() => {
    fetchServicos();
  }, []);

  const fetchServicos = async () => {
    try {
      const response = await axios.get("http://localhost:8081/task");
      setServicos(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços", error);
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

  // Filtrar serviços com base no termo digitado
  const servicosFiltrados = servicos.filter((servico) =>
    servico.name.toLowerCase().includes(termoBusca.toLowerCase()) ||
    servico.description.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="pagina-com-sidebar">
      <Sidebar />

      <div className="conteudo-principal">
        <h2 className="titulo-servico">Serviços</h2>

        <div className="topo-servico">
          <button className="btn btn-outline-dark filtro-btn">Adicionar Filtro ▼</button>

          <div className="pesquisa-container" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="form-control pesquisa-input"
              placeholder="Pesquisar..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // já filtra automaticamente com o estado
                }
              }}
            />
            
          </div>

          <button
            className="btn btn-outline-dark cadastro-btn"
            onClick={() => setExibirCadastro(true)}
          >
            <FaTools style={{ marginRight: "6px" }} />
            Cadastrar Serviço
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
              <th>Ativo</th>
              <th>Ações</th>
            </tr>
            {/* arrumar essa estrutura em portugues */}
          </thead>
          <tbody>
            {servicosFiltrados.length > 0 ? (
              servicosFiltrados.map((servico, index) => (
                <tr key={servico.id ?? index}>
                  <td>{index + 1}</td>
                  <td>{servico.name}</td>
                  <td>R${servico.price.toFixed(2)}</td>
                  <td>{servico.timeConclusion} min</td>
                  <td>{servico.description}</td>
                  <td>{servico.isActive ? "Ativo" : "Inativo"}</td>
                  <td>
                    <button
                      className="icon-button edit"
                      onClick={() => handleEditar(servico)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="icon-button delete"
                      onClick={() => handleExcluir(servico.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
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
