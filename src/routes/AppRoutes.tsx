import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UsuarioContextProvider  } from "../context/UsuarioContext";
import ListaCadastro from "../pages/listaCadastro/ListaCadastro";
import { Navigate } from "react-router-dom";



function AppRoutes() {
  return (
    <UsuarioContextProvider >
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/client" />} /> {/* Redireciona "/" para "/client" */}
          <Route path="/client" element={<ListaCadastro />} />
          <Route path="/cadastrar" element={<ListaCadastro />} />
        </Routes>
      </Router>
    </UsuarioContextProvider >
  )
}

export default AppRoutes
