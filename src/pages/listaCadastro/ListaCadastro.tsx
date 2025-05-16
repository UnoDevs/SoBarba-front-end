import { useUsuarios } from "../../context/UsuarioContext";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ModalCadastro from "../../components/modalCadastro/Modal";
import { Usuario } from "../../types/Usuario";
import IconButton from "../../components/iconButton/IconButton";
import { clienteService } from "../../services/clienteService";
import Sidebar from "../../components/sidebar/Sidebar"; // <-- Importando a Sidebar
import styles from "./ListaCadastro.module.css";

function ListaCadastro() {
  const { usuarios, setUsuarios } = useUsuarios();
  const [pesquisa, setPesquisa] = useState("");
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isModalRoute = location.pathname === "/cadastrar";

  const editarUsuario = (id: number) => {
    // const usuario = usuarios.find((usuario) => usuario.id === id);
    const usuario = usuarios.find((usuario) => usuario.id === id) as Usuario;
    if (usuario) {
      setUsuarioEditando(usuario);
      navigate("/cadastrar");
    }
  };

  const closeModal = () => {
    navigate("/person");
    setUsuarioEditando(null);
  };

  type NovoCliente = {
    name: string;
    description: string;
    birthDate: string;
    email: string;
    phone: string;
    active: boolean;
    cpf: string;    
    tipo: "cliente" | "funcionario"; // Adicionando a propriedade 'tipo'
  };

  const addCliente = async (novoCliente: Omit<NovoCliente, "id">) => {

    // Garantir que tipo tenha um valor
    const clienteParaCadastrar = {
      ...novoCliente,
      tipo: novoCliente.tipo || "cliente", // define como cliente se não tiver
    };

    // Validação para garantir que o CPF está presente para funcionários
    if (clienteParaCadastrar.tipo === "funcionario" && !clienteParaCadastrar.cpf) {
      alert("O CPF é obrigatório para funcionários.");
      return;
    }

    try {
      const response: Usuario = await clienteService.addCliente(clienteParaCadastrar);
      setUsuarios((prevUsuarios) => [...prevUsuarios, response]);
      alert("Cliente cadastrado com sucesso!");
      closeModal();
    } catch (error) {
      console.error("Erro ao cadastrar o cliente: ", error);
      alert("Erro ao cadastrar o cliente.");
    }
  };
  

  const excluirUsuario = async (id: number) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este cliente?");
    if (!confirmacao) return;

    try {
      await clienteService.deleteCliente(id);
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
      alert("Cliente excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o cliente: ", error);
      alert("Erro ao excluir o cliente.");
    }
  };

  const salvarEdicao = async (usuarioAtualizado: Usuario) => {

    if (!usuarioAtualizado.name || !usuarioAtualizado.description || !usuarioAtualizado.birthDate || !usuarioAtualizado.email ||
      (usuarioAtualizado.tipo === 'cliente' && !usuarioAtualizado.phone) || 
      (usuarioAtualizado.tipo === 'funcionario' && !usuarioAtualizado.cpf)) {
      alert("Favor preencher os campos obrigatórios!");
      return;
    } 

    try {
      const response = await clienteService.updateCliente(usuarioAtualizado.id, usuarioAtualizado);
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === usuarioAtualizado.id ? response : usuario
        )
      );
      alert("Cliente atualizado com sucesso!");
      closeModal();
    } catch (error) {
      console.error("Erro ao editar o cliente: ", error);
      alert("Erro ao atualizar o cliente.");
    }
  };

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario && usuario.name && usuario.name.toLowerCase().includes(pesquisa.toLowerCase())
  );

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await clienteService.getClientes();
        console.log(response); // Verifique os dados aqui
        setUsuarios(response);
      } catch (error) {
        console.error("Erro ao buscar os usuários: ", error);
        alert("Erro ao buscar os usuários.");
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="container-box container mt-4" style={{ flex: 1 }}>
        <h2>Clientes</h2>

        <div className={styles.headerContainer}>
          <button className={styles.filterButton}>
            Adicionar Filtro <span>▼</span>
          </button>

          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input type="text"
              placeholder="Pesquisar..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <button onClick={() => navigate("/cadastrar")} className={styles.addButton}>
            <span className={styles.userIcon}>👤</span> Cadastrar Cliente
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px", padding: "10px" }} className="table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }} scope="col">ID</th>
                <th style={{ textAlign: "center" }} scope="col">name</th>
                <th style={{ textAlign: "center" }} scope="col">Descrição</th>
                <th style={{ textAlign: "center" }} scope="col">Data de Nascimento</th>
                <th style={{ textAlign: "center" }} scope="col">E-mail</th>
                <th style={{ textAlign: "center" }} scope="col">
                  {usuarios[0]?.tipo === "cliente" ? "Telefone" : "CPF"}
                </th>
                <th style={{ textAlign: "center" }} scope="col">Status</th>
                <th style={{ textAlign: "center" }} scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center" }}>Nenhum usuário encontrado.</td>
                </tr>
              ) : (
                usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id}>
                    <td style={{ textAlign: "center" }}>{usuario.id}</td>
                    <td style={{ textAlign: "center" }}>{usuario.name}</td>
                    <td style={{ textAlign: "center" }}>{usuario.description}</td>
                    <td style={{ textAlign: "center" }}>{usuario.birthDate.slice(0, 10)}</td>
                    <td style={{ textAlign: "center" }}>{usuario.email}</td>
                    {/* Aqui faz a troca entre Telefone ou CPF */}
                    <td style={{ textAlign: "center" }}>
                      {usuario.tipo === 'cliente' ? usuario.phone : usuario.cpf}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {usuario.active ? "Ativo" : "Inativo"}
                    </td>
                    <td style={{ padding: "8px", textAlign: "center" }}>
                      <IconButton onClick={() => editarUsuario(usuario.id)} icon="edit" ariaLabel="Editar usuário" />
                      <IconButton onClick={() => excluirUsuario(usuario.id)} icon="delete" ariaLabel="Excluir usuário" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <ModalCadastro
          showModal={isModalRoute}
          closeModal={closeModal}
          addCliente={addCliente}
          usuarioEditando={usuarioEditando}
          setUsuarios={setUsuarios}
          salvarEdicao={salvarEdicao}
        />
      </div>
    </div>
  );
}

export default ListaCadastro;
