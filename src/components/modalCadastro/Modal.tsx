import { useState, useEffect } from 'react';
<<<<<<< HEAD
import axios from "axios";
=======
>>>>>>> origin/feature/ajustes-interface-cliente-funcionario
import styles from './Modal.module.css';
import { Usuario } from "../../types/Usuario";

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
<<<<<<< HEAD
  addCliente: (novoCliente: { nome: string; descricao: string; dataNascimento: string }) => Promise<void>;
  usuarioEditando: Usuario | null; 
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
  salvarEdicao: (usuarioAtualizado: { id: number; nome: string; descricao: string; dataNascimento: string }) => Promise<void>; // Função de edição
=======
  addCliente: (novoCliente: { name: string; description: string; birthDate: string; email: string; phone: string; active: boolean; cpf: string; tipo: "cliente" | "funcionario"; }) => Promise<void>;
  usuarioEditando: Usuario | null; 
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
  salvarEdicao: (usuarioAtualizado: { id: number; name: string; description: string; birthDate: string; email: string; phone: string; active: boolean; cpf: string; tipo: "cliente" | "funcionario"; }) => Promise<void>; // Função de edição
>>>>>>> origin/feature/ajustes-interface-cliente-funcionario
}

const ModalCadastro: React.FC<ModalProps> = ({ 
  showModal, 
  closeModal, 
  addCliente, 
<<<<<<< HEAD
  usuarioEditando, 
  salvarEdicao  
}) => {
  const [nome, setNome] = useState(usuarioEditando?.nome || '');
  const [descricao, setDescricao] = useState(usuarioEditando?.descricao || '');
  const [dataNascimento, setDataNascimento] = useState(usuarioEditando?.dataNascimento || '');

  // Quando 'usuarioEditando' mudar, atualiza os campos do formulário
  useEffect(() => {
    if (usuarioEditando) {
      setNome(usuarioEditando.nome);
      setDescricao(usuarioEditando.descricao);
      setDataNascimento(usuarioEditando.dataNascimento);
    }
  }, [usuarioEditando]);
=======
  usuarioEditando,
  salvarEdicao  
}) => {
  const [name, setName] = useState(usuarioEditando?.name || '');
  const [description, setDescription] = useState(usuarioEditando?.description || '');
  const [birthDate, setBirthDate] = useState(usuarioEditando?.birthDate || '');
  const [email, setEmail] = useState(usuarioEditando?.email || '');
  const [phone, setPhone] = useState(usuarioEditando?.phone || '');
  const [active, setActive] = useState(usuarioEditando?.active || false);
  const [cpf, setCpf] = useState(usuarioEditando?.cpf || '');
  const [tipo, setTipo] = useState<'cliente' | 'funcionario'>('cliente');
  const [funcao, setFuncao] = useState('');

  useEffect(() => {
    if (showModal && usuarioEditando) {
      setCpf(usuarioEditando.cpf || '');  // Garantir que o CPF seja setado corretamente
    }
  }, [showModal, usuarioEditando]);

  useEffect(() => {
    if (showModal) {
      console.log(usuarioEditando);  // Log para ver se os dados estão corretos
      if (usuarioEditando) {
        setName(usuarioEditando.name);
        setDescription(usuarioEditando.description);
        setBirthDate(usuarioEditando.birthDate);
        setEmail(usuarioEditando.email);
        setPhone(usuarioEditando.phone);
        setActive(usuarioEditando.active);
        setCpf(usuarioEditando.cpf);
        setTipo(usuarioEditando.tipo);
      } else {
        // Limpa os campos ao abrir para cadastro
        setName("");
        setDescription("");
        setBirthDate("");
        setEmail("");
        setPhone("");
        setActive(false);
        setCpf("");
        setTipo('cliente');
      }
    }
  }, [showModal, usuarioEditando]);   

  // Modificar closeModal para limpar os campos
  const closeAndClearModal = () => {
    closeModal(); // Chama a função de fechar
    setName(""); 
    setDescription(""); 
    setBirthDate("");
    setEmail("");
    setPhone("");
    setActive(false); 
    setCpf("");
    setTipo('cliente');
  };
>>>>>>> origin/feature/ajustes-interface-cliente-funcionario

  if (!showModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

<<<<<<< HEAD
    // Validar os dados antes de enviar
    if (!nome || !descricao || !dataNascimento) {
      alert('Todos os campos são obrigatórios');
      return;
    }

    const novoCliente = { nome, descricao, dataNascimento };

    if (usuarioEditando) {
      await salvarEdicao({
        id: usuarioEditando.id,  // Adiciona o id para edição
        nome, 
        descricao, 
        dataNascimento
      });
    } else {
      try {
        await axios.post('http://localhost:8081/client', novoCliente);
        alert('Cliente cadastrado com sucesso!');
        await addCliente(novoCliente);
      } catch (error) {
        console.error('Erro ao cadastrar cliente: ', error);
        alert('Erro ao cadastrar cliente.');
      }
    }
      
    closeModal();

=======
    // Validar CPF apenas para funcionários
    if (tipo === 'funcionario' && !cpf) {
      alert('O campo CPF é obrigatório para funcionários.');
      return;
    }

    // Validar os dados antes de enviar
    if (tipo === 'cliente') {
      if (!name || !description || !birthDate || !email || !phone) {
        alert('Todos os campos são obrigatórios para cliente.');
        return;
      }
    } else if (tipo === 'funcionario') {
      if (!name || !description || !birthDate || !email || !cpf || !tipo) {
        alert('Todos os campos são obrigatórios para funcionário.');
        return;
      }
    }

    const novoCliente = { name, description, birthDate, email, phone, active: Boolean(active), cpf, tipo };

    try {      
      if (usuarioEditando) {
        console.log('Editando cliente:', novoCliente);
        await salvarEdicao({
          id: usuarioEditando.id,
          ...novoCliente,
        });
      } else {  
        console.log('Adicionando novo cliente:', novoCliente);    
        await addCliente(novoCliente);
      }     

    } catch (error) {
      console.error('Erro ao cadastrar cliente: ', error);
      alert('Erro ao cadastrar cliente.');
    }

    // closeModal();
    closeAndClearModal(); // Usa a nova função para fechar e limpar os campos

  };

  // Função que lida com a mudança no checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setActive(checked); // Atualiza diretamente o estado do "isActive"
>>>>>>> origin/feature/ajustes-interface-cliente-funcionario
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
      <h2 className={styles.modalTitle}>{usuarioEditando ? "Editar Cliente" : "Cadastrar Novo Cliente"}</h2>
<<<<<<< HEAD
        <form onSubmit={handleSubmit} className={styles.modalBody}>
          <input
            className={styles.modalInput}
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            className={styles.modalInput}
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <input
            className={styles.modalInput}
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
          <button type="submit" className={styles.modalButton}>{usuarioEditando ? "Editar" : "Cadastrar"} </button>
          <button type="button" onClick={closeModal} className={styles.closeButton}>Fechar</button>
        </form>
=======
      <div className={styles.tipoCadastro}>
        <label>
          <input
            type="radio"
            name="tipoCadastro"
            value="cliente"
            checked={tipo === 'cliente'}
            onChange={() => setTipo('cliente')}
          />
          Cliente
        </label>
        <label>
          <input
            type="radio"
            name="tipoCadastro"
            value="funcionario"
            checked={tipo === 'funcionario'}
            onChange={() => setTipo('funcionario')}
          />
          Funcionário
        </label>
      </div>
        <form onSubmit={handleSubmit} className={styles.modalBody}>
          {/* Campos comuns */}
          <div className="mb-3">
            <input
              className={styles.modalInput}
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className={styles.modalInput}
              type="text"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className={styles.modalInput}
              type="date"
              placeholder="Data de Nascimento"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className={styles.modalInput}
              type="email"
              name="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Campos específicos */}
          {tipo === 'cliente' ? (
            <>
              <div className="mb-3">
                <input
                  className={styles.modalInput}
                  type="tel"
                  name="phone"
                  placeholder="Telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-check-label" htmlFor="active">
                  <input
                    className={styles.modalInput}
                    type="checkbox"
                    name="active"
                    checked={active}
                    onChange={handleCheckboxChange}  // Agora estamos chamando a função handleCheckboxChange
                  />
                  Ativo
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                <input
                  className={styles.modalInput}
                  type="text"
                  placeholder="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <select
                  className={styles.modalInput}
                  value={funcao}
                  onChange={(e) => setFuncao(e.target.value)}
                >
                  <option value="">Selecione Cargo/Função</option>
                  <option value="gerente">Gerente</option>
                  <option value="atendente">Atendente</option>
                  {/* Outras funções */}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-check-label" htmlFor="active">
                  <input
                    className={styles.modalInput}
                    type="checkbox"
                    name="active"
                    checked={active}
                    onChange={handleCheckboxChange}
                  />
                  Ativo
                </label>
              </div>
            </>
          )}

          {/* Botões */}
          <button type="submit" className={styles.modalButton}>
            {usuarioEditando ? "Editar" : "Cadastrar"}
          </button>
          <button type="button" onClick={closeModal} className={styles.closeButton}>Cancelar</button>
        </form>

>>>>>>> origin/feature/ajustes-interface-cliente-funcionario
      </div>
    </div>
  );
};

export default ModalCadastro;
