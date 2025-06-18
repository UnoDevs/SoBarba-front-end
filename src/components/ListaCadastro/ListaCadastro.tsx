import { useUsuarios } from "../../context/UsuarioContext";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ModalCadastro from "../ModalCadastro/Modal";
import { Usuario } from "../../types/Usuario";
import IconButton from "../IconButton/IconButton";
import { clienteService } from "../../services/clienteService";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import styles from "./ListaCadastro.module.css";

function ListaCadastro() {
  const { usuarios, setUsuarios } = useUsuarios();
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  // ✅ Ajuste no tipo TipoPessoa para refletir corretamente as opções disponíveis
  type TipoPessoa = "CUSTOMER" | "EMPLOYEE" | "SUPPLIER" | "OWNER" | "";  
  const [filtroTipo, setFiltroTipo] = useState<TipoPessoa>("");

  const [filtroStatus, setFiltroStatus] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const isModalRoute = location.pathname === "/cadastrar";

  // ✅ Função segura para alterar filtroTipo
  const handleChangeTipo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as TipoPessoa; // Garantindo que o valor seja do tipo TipoPessoa
    setFiltroTipo(value);
  };

  const editarUsuario = (id: number) => {
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

  const addCliente = async (novoCliente: Omit<Usuario, "id">) => {
    const tipos = Array.isArray(novoCliente.personTypes) ? novoCliente.personTypes : [novoCliente.personTypes];

    if (
      (tipos.includes("EMPLOYEE") || tipos.includes("CUSTOMER")) &&
      !novoCliente.document
    ) {
      alert("O documento é obrigatório para Cliente ou Funcionário.");
      return;
    }

    try {
      const response: Usuario = await clienteService.addCliente(novoCliente);
      setUsuarios((prev) => [...prev, response]);
      alert("Cadastro realizado com sucesso!");
      closeModal();
    } catch (error) {
      
    }
  };

  const excluirUsuario = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return;

    try {
      await clienteService.deleteCliente(id);
      setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
      alert("Cliente excluído com sucesso!");
    } catch (error) {
      
    }
  };

  const salvarEdicao = async (usuarioAtualizado: Usuario) => {
    const tipos = Array.isArray(usuarioAtualizado.personTypes)
      ? usuarioAtualizado.personTypes
      : [usuarioAtualizado.personTypes];

    if (
      !usuarioAtualizado.name ||
      !usuarioAtualizado.description ||
      !usuarioAtualizado.email ||
      (tipos.includes("CUSTOMER") && !usuarioAtualizado.document) ||
      (tipos.includes("EMPLOYEE") && !usuarioAtualizado.document)
    ) {
      alert("Favor preencher os campos obrigatórios!");
      return;
    }

    try {
      const response = await clienteService.updateCliente(
        usuarioAtualizado.id,
        usuarioAtualizado
      );
      setUsuarios((prev) =>
        prev.map((usuario) =>
          usuario.id === usuarioAtualizado.id ? response : usuario
        )
      );
      alert("Cliente atualizado com sucesso!");
      closeModal();
    } catch (error) {
      
    }
  };

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const tipos = Array.isArray(usuario.personTypes) ? usuario.personTypes : [usuario.personTypes];
    const tipoCorresponde = filtroTipo === "" || tipos.includes(filtroTipo);
    const statusCorresponde =
      filtroStatus === "" ||
      (filtroStatus === "ativo" && usuario.active) ||
      (filtroStatus === "inativo" && !usuario.active);
    return tipoCorresponde && statusCorresponde;
  });

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await clienteService.getClientes();
        setUsuarios(response);
      } catch (error) {
       
      }
    };
    fetchUsuarios();
  }, [setUsuarios]);

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <Navbar />

      <section className={styles.containerPrincipal}>
        <header className={styles.header}>
          <h2>Clientes</h2>
        </header>

        <div className={styles["filtros-e-botoes"]}>
          <div className={styles["grupo-filtros"]}>
            <span className={styles["filtro-label"]}>Filtrar por:</span>

            <div className={styles["select-wrapper"]}>
              {/* ✅ Alterado para usar handleChangeTipo */}
              <select
                className={styles["filtro-select"]}
                value={filtroTipo}
                onChange={handleChangeTipo}
              >
                <option value="">Tipo</option>
                <option value="CUSTOMER">Cliente</option>
                <option value="EMPLOYEE">Funcionário</option>
                <option value="SUPPLIER">Fornecedor</option>
                <option value="OWNER">Dono</option>
              </select>
              <span className={styles["select-arrow"]}>▼</span>
            </div>

            <div className={styles["select-wrapper"]}>
              <select
                className={styles["filtro-select"]}
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                <option value="">Status</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
              <span className={styles["select-arrow"]}>▼</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/cadastrar")}
            className={styles.addButton}
          >
            + Cadastrar
          </button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>E-mail</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Documento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={8}>Nenhum usuário encontrado.</td>
                </tr>
              ) : (
                usuariosFiltrados.map((usuario) => {
                  const tipos = Array.isArray(usuario.personTypes)
                    ? usuario.personTypes
                    : [usuario.personTypes];
                  return (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>{usuario.name}</td>
                      <td>{usuario.description}</td>
                      <td>{usuario.email}</td>
                      <td>{tipos.join(", ")}</td>
                      <td>{usuario.active ? "Ativo" : "Inativo"}</td>
                      <td>{usuario.document || "-"}</td>
                      <td className={styles.actionsButtons}>
                        <IconButton
                          onClick={() => editarUsuario(usuario.id)}
                          icon="edit"
                          ariaLabel="Editar"
                        />
                        <IconButton
                          onClick={() => excluirUsuario(usuario.id)}
                          icon="delete"
                          ariaLabel="Excluir"
                        />
                      </td>
                    </tr>
                  );
                })
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
      </section>
    </div>
  );
}

export default ListaCadastro;
