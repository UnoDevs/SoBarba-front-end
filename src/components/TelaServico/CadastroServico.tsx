import { useState, useEffect } from "react";
import axios from "axios";

// Definição da interface para tipagem
interface Servico {
  id?: string;
  name: string;
  price: number;
  timeConclusion: number;
  description: string;
  isActive: boolean;
}

function CadastroServico() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [formData, setFormData] = useState<Servico>({
    name: "",
    price: 0,
    timeConclusion: 0,
    description: "",
    isActive: false,
  });

  useEffect(() => {
    fetchServicos();
  }, []);

  const fetchServicos = async () => {
    try {
      const response = await axios.get("http://localhost:8081/task");
      console.log("Dados da API:", response.data);
      setServicos(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/task", formData);
      fetchServicos(); // Atualiza lista
      setFormData({ name: "", price: 0, timeConclusion: 0, description: "", isActive: false });
    } catch (error) {
      console.error("Erro ao cadastrar serviço", error);
    }
  };

  return (
    <div>
      <h2>Cadastro de Serviços</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="name" required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="price" required />
        <input type="number" name="timeConclusion" value={formData.timeConclusion} onChange={handleChange} placeholder="timeConclusion" required />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Descrição" required />
        <label>
          Ativo:
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
        </label>
        <button type="submit">Cadastrar</button>
      </form>

      <h3>Serviços Cadastrados</h3>
      {/* <ul>
        {servicos.length > 0 ? (
          servicos.map((servico: Servico) => (
            <li key={servico.id ?? Math.random()}>
              {servico.name} - R${servico.price.toFixed(2)} - {servico.timeConclusion} min - {servico.description} - isActive: {servico.isActive ? "Ativo" : "Inativo"}
            </li>
            
            
          ))
        ) : (
          <li>Nenhum serviço cadastrado</li>
        )}
      </ul> */}
                  {/*Esse codigo a baixo é do bootstrap, por em quando vou deixar assim */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">price (R$)</th>
              <th scope="col">timeConclusion (min)</th>
              <th scope="col">Descrição</th>
              <th scope="col">isActive</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {servicos.length > 0 ? (
              servicos.map((servico, index) => (
                <tr key={servico.id ?? index}>
                  <th scope="row">{index + 1}</th>
                  <td>{servico.name}</td>
                  <td>R${servico.price.toFixed(2)}</td>
                  <td>{servico.timeConclusion} min</td>
                  <td>{servico.description}</td>
                  <td>{servico.isActive ? "Ativo" : "Inativo"}</td>
                </tr>
              ))
    ) : (
      <tr>
        <td colSpan={6} style={{ textAlign: "center" }}>Nenhum serviço cadastrado</td>
      </tr>
    )}
  </tbody>
</table>



    </div>
  );
}

export default CadastroServico;