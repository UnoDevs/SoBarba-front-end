import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CadastroCliente from "./components/CadastroCliente/CadastroCliente";
import { UsuarioContextProvider } from "./components/UsuarioContent/UsuarioContent";
import ListaCadastro from "./components/ListaCadastro/ListaCadastro";
import CadastroServico from "./components/TelaServico/CadastroServico";
import TelaServicoListagem from "./components/TelaListagem/TelaServicoListagem";
import ListagemProduct from "./components/ListagemProduct/ListagemProduct";

function App() {
  return (
    <UsuarioContextProvider>
      <Router>
        <Routes>
          <Route path="/cadastro-lista" element={<ListaCadastro />} />
          <Route path="/cadastro" element={<CadastroCliente />} />
          <Route path="/servico" element={<CadastroServico />} />
          <Route path="/task" element={<TelaServicoListagem />} />
          <Route path="/product" element={<ListagemProduct />} />
        </Routes>
      </Router>
    </UsuarioContextProvider>
  );
}

export default App;
