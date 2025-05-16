import { useState } from 'react';
import { useUsuarios } from "../../context/UsuarioContext";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { clienteService } from "../../services/clienteService";

function CadastroCliente() {
  const { adicionarUsuario } = useUsuarios();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    birthDate: "",
    email: "",
    phone: "",
    active: false,
    cpf: "",
    tipo: "cliente" as "cliente" | "funcionario", 
  });
  const [showModal, setShowModal] = useState(false);

  const handleCadastro = () => {
    if (!formData.name || !formData.description || !formData.birthDate || !formData.email || 
        (formData.tipo === 'cliente' && !formData.phone) || 
        (formData.tipo === 'funcionario' && !formData.cpf)) {
      alert("Preencha todos os campos obrigatórios.");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, type, value, checked } = target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleVoltar = () => {
    navigate("/"); // Vai voltar para a tela principal
  };

  const handleSubmit = async () => {
    const canSubmit = handleCadastro();
    if (!canSubmit) return; // Não envia os dados se algum campo estiver vazio

    try {
      const response = await clienteService.addCliente({
        ...formData,  // O campo de data já estará no formato correto (yyyy-MM-dd) com o tipo "date"
      });
      console.log("Dados enviados para API:", formData);

      console.log("Usuário cadastrado:", response);
      alert("Usuário cadastrado com sucesso!");

      // Adiciona o usuário à lista de usuários (apenas a resposta do backend)
      adicionarUsuario(response);

      // Limpa o formulário
      setFormData({
        name: "",
        description: "",
        birthDate: "",
        email: "",
        phone: "",
        active: false,
        cpf: "",
        tipo: "cliente", // Inicializando com 'cliente' ou 'funcionario'
      });

    } catch (error) {
      console.error("Erro ao cadastrar: ", error);
    }
  };

  return (
    <div  className="container mt-4">
      <button onClick={handleVoltar}>Voltar</button>
      <h2>Cadastro de Cliente</h2>
      
      <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowModal(true)}>
        <FaUserPlus />
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
                    name="name"
                    placeholder="Nome"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="description">Descrição</label>
                  <input
                    name="description"
                    className="form-control"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                  ></input>
                  <input
                    type="date"
                    name="birthDate"
                    placeholder="Data de Nascimento"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <label htmlFor="active">Ativo</label>
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
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
