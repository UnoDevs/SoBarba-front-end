import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalBarbershop from "../ModalBarbershop/ModalBarbershop";
import Sidebar from "../Sidebar/Sidebar";
import "../ListagemBarbershop/ListagemBarbershop.css";
import Navbar from "../Navbar/Navbar";

type Barbershop = {
  id: number;
  name: string;
  description: string;
  cnpj: string;
  active: boolean;
};

function ListagemBarbershop() {
  const [barbearias, setBarbearias] = useState<Barbershop[]>([]);
  const [filtroNome, setFiltroNome] = useState<string>("");
  const [filtroDescricao, setFiltroDescricao] = useState<string>("");
  const [filtroCnpj, setFiltroCnpj] = useState<string>("");
  const [filtroStatus, setFiltroStatus] = useState<string>("");
  const [exibirCadastro, setExibirCadastro] = useState<boolean>(false);
  const [barbeariaEditando, setBarbeariaEditando] = useState<Barbershop | null>(null);

  useEffect(() => {
    fetchBarbearias();
  }, []);

  const fetchBarbearias = async () => {
    try {
      const response = await axios.get<Barbershop[]>("http://localhost:8081/barbershop");
      setBarbearias(response.data);
    } catch (error) {
      console.error("Erro ao buscar barbearias", error);
    }
  };

  const handleEditar = (barbearia: Barbershop) => {
    setBarbeariaEditando(barbearia);
    setExibirCadastro(true);
  };

  const handleExcluir = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta barbearia?")) {
      try {
        await axios.delete(`http://localhost:8081/barbershop/${id}`);
        fetchBarbearias();
      } catch (error) {
        console.error("Erro ao excluir barbearia", error);
      }
    }
  };

  const barbeariasFiltradas = barbearias.filter((b) => {
    const status = b.active ? "ativo" : "inativo";
    return (
      b.name.toLowerCase().includes(filtroNome.toLowerCase()) &&
      b.description.toLowerCase().includes(filtroDescricao.toLowerCase()) &&
      b.cnpj.toLowerCase().includes(filtroCnpj.toLowerCase()) &&
      status.includes(filtroStatus.toLowerCase())
    );
  });

  return (
    <div className="pagina-com-sidebar">
      <Sidebar />
      <Navbar />
      <div className="conteudo-principal">
        <h1 className="titulo-barbearia">Barbearias</h1>

        <div className="linha-controles">
          <div className="filtros">
            <input
              type="text"
              className="filtro-input-barbeiro"
              placeholder="Filtrar por Nome"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
            />
            <input
              type="text"
              className="filtro-input-barbeiro"
              placeholder="Filtrar por Descrição"
              value={filtroDescricao}
              onChange={(e) => setFiltroDescricao(e.target.value)}
            />
            <input
              type="text"
              className="filtro-input-barbeiro"
              placeholder="Filtrar por CNPJ"
              value={filtroCnpj}
              onChange={(e) => setFiltroCnpj(e.target.value)}
            />
            <input
              type="text"
              className="filtro-input-barbeiro"
              placeholder="Filtrar por Status"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            />
          </div>

          <button
            className="cadastrar-barbearia"
            onClick={() => {
              setBarbeariaEditando(null);
              setExibirCadastro(true);
            }}
          >
            + Cadastrar Barbearia
          </button>
        </div>

        <ModalBarbershop
          barbeariaEditando={barbeariaEditando}
          onCadastro={() => {
            fetchBarbearias();
            setExibirCadastro(false);
            setBarbeariaEditando(null);
          }}
          onClose={() => {
            setExibirCadastro(false);
            setBarbeariaEditando(null);
          }}
          exibir={exibirCadastro}
        />

        <table className="table table-hover bg-white">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>CNPJ</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {barbeariasFiltradas.length > 0 ? (
              barbeariasFiltradas.map((barbearia) => (
                <tr key={barbearia.id}>
                  <td>{barbearia.name}</td>
                  <td>{barbearia.description}</td>
                  <td>{barbearia.cnpj}</td>
                  <td>{barbearia.active ? "Ativo" : "Inativo"}</td>
                  <td>
                    <button
                      className="btn-outline-dark icon-button edit"
                      onClick={() => handleEditar(barbearia)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-outline-dark icon-button delete"
                      onClick={() => handleExcluir(barbearia.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Nenhuma barbearia encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListagemBarbershop;
