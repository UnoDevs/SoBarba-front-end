import React from "react";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Navbar/Navbar.module.css";

const TopNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Importante!

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/financeiro":
        return "Financeiro";
      case "/task":
        return "Serviço";
      case "/person":
        return "Cliente";
      case "/product":
        return "Produto";
      case "/barbershop":
        return "Barbearia";
      case "/category":
        return "Categoria";
      default:
        return "Dashboard";
    }
  };

  const handleLoginClick = () => {
    navigate("/"); // ou "/home", dependendo da sua rota inicial
  };

  return (
    <Navbar variant="dark" className={`${styles["navbar-custom"]} px-4 py-3`}>
      <Navbar.Brand href="#">{getPageTitle()}</Navbar.Brand>
      <Form className="d-flex align-items-center ms-auto me-3">
        <FormControl
          type="search"
          placeholder="Pesquisar..."
          className={`${styles.formControlCustom} me-2`}
        />
        <Button variant="outline-light">
          <FaSearch />
        </Button>
      </Form>
      <Button variant="outline-light" onClick={handleLoginClick}>
        <FaUserCircle className="me-2" />
        Login
      </Button>
    </Navbar>
  );
};

export default TopNavbar;
