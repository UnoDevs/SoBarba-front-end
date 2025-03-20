import { useState } from 'react'
import axios from "axios";
import '../App.css'

function CadastroUsuario() { 
  const [formData, setFormData]  = useState({
    nome: "",
    descricao: "",
    dataNascimento: "",
  });


  const handleCadastro = () => {
    if(!formData.nome || !formData.descricao || !formData.dataNascimento) {
        alert("Preencha todos os campos.");
        return;
    }
    return true; 
  }

  const handleSubmit = async () => {
    
    const canSubmit = handleCadastro();
    if (!canSubmit) return; // Se não for possível, não envia os dados

    try {
      const response = await axios.post("http://localhost:8081/cliente", formData);
      console.log("Usuário cadastrado:", response.data);
      alert("Cadastro realizado com sucesso!");

      // 🔹 Limpando os estados
      setFormData({ nome: "", descricao: "", dataNascimento: "" });
    } catch(error) {
      console.error("Erro ao cadastrar: ", error);
      alert("Erro ao cadastrar o usuário!");
    }
  }

  return (
    <div >
        <h1>Cadastro de usuário</h1>
        
        <label htmlFor="nome" className="col-sm-2 col-form-label">Nome</label>
        {/* <input type="text" id="nome" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })}/> */}
        <input type="text" className="form-control" id="nome" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })}/>

      
        <label htmlFor="descricao">Descrição</label>
        {/* <input type="text" id="descricao" value={formData.descricao} onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}/> */}
        <textarea className="form-control" id="descricao" rows={3} value={formData.descricao} onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}></textarea>

        <label htmlFor="dataNascimento">Data de Nascimento</label>
        <input type="date" className="container mt-4" id="dataNascimento" value={formData.dataNascimento} onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}/>      

        <button onClick={handleSubmit} >Cadastrar</button>
    </div>    
  )
}

export default CadastroUsuario
