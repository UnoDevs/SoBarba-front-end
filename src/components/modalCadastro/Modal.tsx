// Correções aplicadas com suporte para múltiplos tipos
import { useState, useEffect } from 'react';
import styles from './Modal.module.css';
import { Usuario } from "../../types/Usuario";

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  addCliente: (novoCliente: Omit<Usuario, "id">) => Promise<void>;
  usuarioEditando: Usuario | null;
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
  salvarEdicao: (usuarioAtualizado: Usuario) => Promise<void>;
}

const ModalCadastro: React.FC<ModalProps> = ({
  showModal,
  closeModal,
  addCliente,
  usuarioEditando,
  salvarEdicao
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState(false);
  const [document, setDocument] = useState('');
  const [funcao, setFuncao] = useState('');
  const [personTypes, setPersonTypes] = useState<Usuario["personTypes"]>([]);

  useEffect(() => {
    if (showModal && usuarioEditando) {
      setName(usuarioEditando.name);
      setDescription(usuarioEditando.description);
      setEmail(usuarioEditando.email);
      setPhone(usuarioEditando.phone);
      setActive(usuarioEditando.active);
      setDocument(usuarioEditando.document);
      setPersonTypes(usuarioEditando.personTypes);
    } else if (showModal) {
      setName('');
      setDescription('');
      setEmail('');
      setPhone('');
      setActive(false);
      setDocument('');
      setPersonTypes([]);
    }
  }, [showModal, usuarioEditando]);

  const togglePersonType = (tipo: Usuario["personTypes"][number]) => {
    setPersonTypes((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
    );
  };

  const closeAndClearModal = () => {
    closeModal();
    setName('');
    setDescription('');
    setEmail('');
    setPhone('');
    setActive(false);
    setDocument('');
    setFuncao('');
    setPersonTypes([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoCliente = {
      name,
      description,
      email,
      phone,
      active,
      document,
      personTypes,
    };

    try {
      if (usuarioEditando) {
        await salvarEdicao({ id: usuarioEditando.id, ...novoCliente });
      } else {
        await addCliente(novoCliente);
      }
    } catch (error) {
      
    }

    closeAndClearModal();
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActive(e.target.checked);
  };

  return !showModal ? null : (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>
          {usuarioEditando ? "Editar Cadastro" : "Cadastrar Novo"}
        </h2>

        <div className={styles.tipoCadastro}>
          {["CUSTOMER", "SUPPLIER", "EMPLOYEE", "OWNER"].map((tipo) => (
            <label key={tipo}>
              <input
                type="checkbox"
                checked={personTypes.includes(tipo as Usuario["personTypes"][number])}
                onChange={() => togglePersonType(tipo as Usuario["personTypes"][number])}
              />
              {tipo === "CUSTOMER" && "Cliente"}
              {tipo === "SUPPLIER" && "Fornecedor"}
              {tipo === "EMPLOYEE" && "Funcionário"}
              {tipo === "OWNER" && "Proprietário"}
            </label>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          <input
            className={styles.modalInput}
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className={styles.modalInput}
            type="text"
            placeholder="Descrição (dia da semana ex: Segunda)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            className={styles.modalInput}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className={styles.modalInput}
            type="tel"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className={styles.modalInput}
            type="text"
            placeholder="Documento"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
          />

          <select
            className={styles.modalInput}
            value={funcao}
            onChange={(e) => setFuncao(e.target.value)}
          >
            <option value="">Selecione Cargo/Função</option>
            <option value="gerente">Gerente</option>
            <option value="atendente">Atendente</option>
          </select>

          <label>
            <input
              type="checkbox"
              checked={active}
              onChange={handleCheckboxChange}
            />
            Ativo
          </label>

          <button type="submit" className={styles.modalButton}>
            {usuarioEditando ? "Editar" : "Cadastrar"}
          </button>
          <button type="button" onClick={closeAndClearModal} className={styles.closeButton}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalCadastro;
