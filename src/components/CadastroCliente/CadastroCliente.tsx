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
    email: "",
    phone: "",
    active: false,
    document: "",
    personTypes: "CUSTOMER" as "CUSTOMER" | "EMPLOYEE",
  });

  const [showModal, setShowModal] = useState(false);

  const handleCadastro = () => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.email ||
      (formData.personTypes === 'CUSTOMER' && !formData.phone)
    ) {
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
    navigate("/");
  };

  const handleSubmit = async () => {
    const canSubmit = handleCadastro();
    if (!canSubmit) return;

    // 🔧 Construção do objeto final de envio para a API
    const payload = {
      name: formData.name,
      description: formData.description,
      email: formData.email,
      phone: formData.phone,
      active: formData.active,
      document: formData.document,
      personTypes: formData.personTypes,  // Aqui não precisa mais ser um array
      ...(formData.personTypes === "EMPLOYEE" && {
        employeeData: {
          hireDate: "2025-05-26",       // ou dinamicamente via Date()
          terminationDate: "2025-05-26",
          salary: 1500.0,
          commission: 8,
          jobTitle: "BARBER"
        }
      })
    };

    try {
      const response = await clienteService.addCliente(payload);

      console.log("Dados enviados para API:", payload);
      console.log("Usuário cadastrado:", response);
      alert("Usuário cadastrado com sucesso!");

      adicionarUsuario({
        ...response,
        personTypes: response.personTypes,  // Não precisa de transformação, já é um único valor
      });

      setFormData({
        name: "",
        description: "",
        email: "",
        phone: "",
        active: false,
        document: "",
        personTypes: "CUSTOMER",
      });

    } catch (error) {
      console.error("Erro ao cadastrar: ", error);
    }
  };

  return (
    <div className="container mt-4">
      <button onClick={handleVoltar}>Voltar</button>
      <h2>Cadastro de Cliente</h2>

      <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowModal(true)}>
        <FaUserPlus />
        Cadastrar Cliente
      </button>

      {showModal && (
        <div className="modal show" tabIndex={-1} style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cadastrar Cliente</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Tipo:</label>
                  <div>
                    <label className="me-2">
                      <input
                        type="radio"
                        name="personTypes"
                        value="cliente"
                        checked={formData.personTypes === "CUSTOMER"}
                        onChange={handleChange}
                      />
                      Cliente
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="personTypes"
                        value="funcionario"
                        checked={formData.personTypes === "EMPLOYEE"}
                        onChange={handleChange}
                      />
                      Funcionário
                    </label>
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                  <label htmlFor="description">Descrição</label>
                  <input
                    name="description"
                    className="form-control mb-2"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      name="active"
                      checked={formData.active}
                      onChange={handleChange}
                      className="form-check-input"
                      id="active"
                    />
                    <label className="form-check-label" htmlFor="active">Ativo</label>
                  </div>
                  <input
                    type="text"
                    name="document"
                    placeholder="CPF"
                    value={formData.document}
                    onChange={handleChange}
                    className="form-control mb-2"
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
