import { useState, useEffect } from 'react';
import styles from './Modal.module.css';
import { Usuario } from "../../types/Usuario";

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  addCliente: (novoCliente: { nome: string; descricao: string; dataNascimento: string }) => Promise<void>;
  usuarioEditando: Usuario | null; 
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
  salvarEdicao: (usuarioAtualizado: { id: number; nome: string; descricao: string; dataNascimento: string }) => Promise<void>; // Função de edição
}

const ModalCadastro: React.FC<ModalProps> = ({ 
  showModal, 
  closeModal, 
  addCliente, 
  usuarioEditando,
  salvarEdicao  
}) => {
  const [nome, setNome] = useState(usuarioEditando?.nome || '');
  const [descricao, setDescricao] = useState(usuarioEditando?.descricao || '');
  const [dataNascimento, setDataNascimento] = useState(usuarioEditando?.dataNascimento || '');

  useEffect(() => {
    if (showModal) {
      if (usuarioEditando) {
        setNome(usuarioEditando.nome);
        setDescricao(usuarioEditando.descricao);
        setDataNascimento(usuarioEditando.dataNascimento);
      } else {
        // Limpa os campos ao abrir para cadastro
        setNome("");
        setDescricao("");
        setDataNascimento("");
      }
    }
  }, [showModal, usuarioEditando]); 
  

  // Modificar closeModal para limpar os campos
  const closeAndClearModal = () => {
    closeModal(); // Chama a função de fechar
    setNome(""); 
    setDescricao(""); 
    setDataNascimento(""); 
  };

  if (!showModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar os dados antes de enviar
    if (!nome || !descricao || !dataNascimento) {
      alert('Todos os campos são obrigatórios');
      return;
    }

    const novoCliente = { nome, descricao, dataNascimento };

    try {
      if (usuarioEditando) {
        await salvarEdicao({
          id: usuarioEditando.id,  // Adiciona o id para edição
          nome, 
          descricao, 
          dataNascimento
        });
      } else {      
        await addCliente(novoCliente);
      }     

    } catch (error) {
      console.error('Erro ao cadastrar cliente: ', error);
      alert('Erro ao cadastrar cliente.');
    }

    // closeModal();
    closeAndClearModal(); // Usa a nova função para fechar e limpar os campos

  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
      <h2 className={styles.modalTitle}>{usuarioEditando ? "Editar Cliente" : "Cadastrar Novo Cliente"}</h2>
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
          <button type="submit" className={styles.modalButton}>{ usuarioEditando ? "Editar" : "Cadastrar" } </button>
          <button type="button" onClick={closeModal} className={styles.closeButton}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default ModalCadastro;
