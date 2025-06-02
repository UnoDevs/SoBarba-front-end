import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { UsuarioContextProvider } from "../context/UsuarioContext";
import ListaCadastro from "../components/ListaCadastro/ListaCadastro";
import ListagemBarbershop from "../components/ListagemBarbershop/ListagemBarbershop";
import ListagemProduct from "../components/ListagemProduct/ListagemProduct";
import TelaListagem from "../components/ListagemService/TelaServicoListagem";
import Dashboard from "@/components/Dashboard/Dashboard";
import ListagemCaterory from "../components/ListagemCategory/ListagemCategory";
import Login from "@/components/Login/Login";
import TopNavbar from "@/components/Navbar/Navbar";

function AppRoutes() {
  // Custom hook para pegar localização dentro do Router
  function Layout() {
    const location = useLocation();
    // Defina as rotas onde não quer navbar, ex: /home que é o login no seu caso
    const noNavbarRoutes = ["/home"];

    const showNavbar = !noNavbarRoutes.includes(location.pathname);

    return (
      <>
        {showNavbar && <TopNavbar />}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} /> 
          <Route path="/home" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/person" element={<ListaCadastro />} />
          <Route path="/cadastrar" element={<ListaCadastro />} />
          <Route path="/barbershop" element={<ListagemBarbershop />} />
          <Route path="/product" element={<ListagemProduct />} />
          <Route path="/task" element={<TelaListagem />} />
          <Route path="/category" element={<ListagemCaterory />} />
        </Routes>
      </>
    );
  }

  return (
    <UsuarioContextProvider>
      <Router>
        <Layout />
      </Router>
    </UsuarioContextProvider>
  );
}

export default AppRoutes;
