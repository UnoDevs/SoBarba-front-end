import { useState } from 'react';
import { useUsuarios } from "../../context/UsuarioContext";
import { useNavigate } from "react-router-dom";
import IconButton from "@/components/iconButton/IconButton";
import { FaUserPlus } from "react-icons/fa";
import { clienteService } from "../../services/clienteService"; // Importando o clienteService

function CadastroCliente() {
  const { adicionarUsuario } = useUsuarios();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    dataNascimento: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleCadastro = () => {
    if(!formData.nome || !formData.descricao || !formData.dataNascimento) {
      alert("Preencha todos os campos.");
      return false;
    }
    return true; 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVoltar = () => {
    navigate("/");
  };

  const handleSubmit = async () => {
    const canSubmit = handleCadastro();
    if (!canSubmit) return; // Não envia os dados se algum campo estiver vazio

    try {
      const response = await clienteService.addCliente({
        ...formData,  // O campo de data já estará no formato correto (yyyy-MM-dd) com o tipo "date"
      });

      console.log("Usuário cadastrado:", response);
      alert("Usuário cadastrado com sucesso!");

      // Adiciona o usuário à lista de usuários (apenas a resposta do backend)
      adicionarUsuario(response);

      // Limpa o formulário
      setFormData({
        nome: "",
        descricao: "",
        dataNascimento: "",
      });

    } catch (error) {
      console.error("Erro ao cadastrar: ", error);
    }
  };

  return (
    <div  className="container mt-4">
      <button onClick={handleVoltar}>Voltar</button>
      <h2>Cadastro de Cliente</h2>
      <button onClick={() => setShowModal(true)} className="btn btn-primary">
        <IconButton icon={<FaUserPlus />} onClick={() => {}} ariaLabel="Ícone de adicionar usuário" />
        Cadastrar Cliente
      </button>

      {/* Modal do Bootstrap */}
      {showModal && (
        <div className="modal show" tabIndex={-1} style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cadastrar Cliente</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                  <label htmlFor="descricao">Descrição</label>
                  <textarea
                    className="form-control"
                    id="descricao"
                    rows={3}
                    value={formData.descricao}
                    onChange={handleChange}
                  ></textarea>
                  <input
                    type="date"
                    name="dataNascimento"
                    placeholder="Data de Nascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                  />
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fechar</button>
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastroCliente;
