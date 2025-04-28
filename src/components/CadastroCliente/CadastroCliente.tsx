import { useState } from 'react';
import axios from "axios";
import { useUsuarios } from "../UsuarioContent/UsuarioContent";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.post("http://localhost:8081/client", {
        ...formData,  // O campo de data já estará no formato correto (yyyy-MM-dd) com o tipo "date"
      }, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("Usuário cadastrado:", response.data);
      alert("Usuário cadastrado com sucesso!");

      // Adiciona o usuário à lista de usuários (apenas a resposta do backend)
      adicionarUsuario(response.data);

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
    <div>
      <button onClick={handleVoltar}>Voltar</button>
      <h2>Cadastro de Cliente</h2>
      {/* Botão para abrir o Modal */}
      <button onClick={() => setShowModal(true)}>Cadastrar Cliente</button>
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
