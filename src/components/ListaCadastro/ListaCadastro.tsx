import { useUsuarios } from "../UsuarioContent/UsuarioContent";
import { useState, useEffect } from "react";
import ModalCadastro from "../ModalCadastro/Modal"; 
import axios from "axios";
import { Usuario } from "../../types/Usuario"; 
import IconButton from "../IconButton/IconButton";
import styles from "./ListaCadastro.module.css"; 

function ListaCadastro() {
  const { usuarios, setUsuarios } = useUsuarios();
  const [pesquisa, setPesquisa] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null); 

  // Função para editar o usuário ao clicar no lápis
  const editarUsuario = (id: number) => {
    const usuario = usuarios.find((usuario) => usuario.id === id);
    console.log(usuario);
    if (usuario) {
      setUsuarioEditando(usuario);  // Define o usuário a ser editado
      setShowModal(true);  // Abre o modal
    }
  };

  const closeModal = () => {
    setShowModal(false);  // Fecha o modal
    setUsuarioEditando(null);  // Limpa o usuário editado
  };

  const addCliente = async (novoCliente: { nome: string; descricao: string; dataNascimento: string }) => {
    try {
      // Aqui você pode adicionar o código para fazer a requisição para o backend
      const response = await axios.post("http://localhost:8081/client", novoCliente);      
      // Adiciona o novo cliente à lista de usuários
      setUsuarios((prevUsuarios) => [...prevUsuarios, response.data]);
      
      alert("Cliente cadastrado com sucesso!");
      closeModal(); // Fecha o modal após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar o cliente: ", error);
      alert("Erro ao cadastrar o cliente.");
    }
  };

  // Função para excluir um usuário
  const excluirUsuario = async (id: number) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este cliente?");
    if (!confirmacao) return;

    try {
      await axios.delete(`http://localhost:8081/client/${id}`);
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
      alert("Cliente excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o cliente: ", error);
      alert("Erro ao excluir o cliente.");
    }
  };
  
  const salvarEdicao = async (usuarioAtualizado: Usuario) => {
    if (usuarioEditando) {
      const { nome, descricao, dataNascimento } = usuarioEditando; 

      // Verifica se todos os campos estão preenchidos
      if (!nome || !descricao || !dataNascimento) {
        alert("Todos os campos são obrigatórios!");
        return;
      }       
        
        try {
          const response = await axios.put(`http://localhost:8081/client/${usuarioAtualizado.id}`, usuarioAtualizado);

          console.log("Resposta do backend:", response.data);

          setUsuarios((prevUsuarios) => {
            return prevUsuarios.map((usuario) =>
              usuario.id === usuarioAtualizado.id ? usuarioAtualizado : usuario
            );
          });

          closeModal();  // Fecha o modal

          alert("Cliente atualizado com sucesso!");

        } catch (error) {
          console.error("Erro ao editar o cliente: ", error);
          alert("Erro ao atualizar o cliente.");
        }      
    }
  };  

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nome.toLowerCase().includes(pesquisa.toLowerCase()) // A comparação deve ser case-insensitive
  );

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:8081/client");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar os usuários: ", error);
        alert("Erro ao buscar os usuários.");
      }
    };
  
    // Chama a função para buscar os dados sempre que a lista de usuários mudar
    fetchUsuarios();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Lista de Clientes</h2>

      <div >
        {/* <button onClick={openModal} className={styles.addButton}> */}
        <button onClick={() => setShowModal(true)} className={styles.addButton}>
          Cadastrar +
        </button>

        <input
          type="text"
          placeholder="Pesquisar..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className={styles.searchInput} // Aplica a classe do input
        />        
      </div>
      <ul>
        {usuariosFiltrados.length === 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Descrição</th>
                <th scope="col">Data de Nascimento</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5}>Nenhum cliente encontrado.</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Descrição</th>
                <th scope="col">Data de Nascimento</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.descricao}</td>
                  <td>{usuario.dataNascimento}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>
                    <IconButton onClick={() => editarUsuario(usuario.id)} icon="edit" ariaLabel="Editar usuário" />
                    <IconButton onClick={() => excluirUsuario(usuario.id)} icon="delete" ariaLabel="Excluir usuário" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </ul>
      {/* Exibir o modal quando showModal for true */}
      <ModalCadastro 
        showModal={showModal}
        closeModal={closeModal} 
        addCliente={addCliente} 
        usuarioEditando={usuarioEditando}  // Passando o usuário que está sendo editado
        setUsuarios={setUsuarios}  // Para atualizar a lista de usuários após a edição
        salvarEdicao={salvarEdicao}
      />
    </div>
  );
}

export default ListaCadastro;
