import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CadastroCliente from "../src/components/CadastroCliente/CadastroCliente";
import { UsuarioContextProvider  } from "../src/components/UsuarioContent/UsuarioContent";
import ListaCadastro from "../src/components/ListaCadastro/ListaCadastro";
import CadastroServico from "./components/TelaServico/CadastroServico"; // Importe sua tela de serviços
import TelaServicoListagem from "./components/TelaServicoListagem/TelaServicoListagem";

function App() {
  return (
    <UsuarioContextProvider >
      <Router>
        <Routes>
          <Route path="/ca" element={<ListaCadastro />} />
          <Route path="/cadastro" element={<CadastroCliente />} />
          <Route path="/servico" element={<CadastroServico />} /> 
          <Route path="/listagem" element={<TelaServicoListagem />} /> 
        </Routes>
      </Router>
    </UsuarioContextProvider >
  )

}

export default App
