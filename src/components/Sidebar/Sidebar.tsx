import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../../assets/logo-sFundo.png";
import { NavLink } from "react-router-dom";
import { BarChart2, Scissors, User, ShoppingBag, Store, Tags, DollarSign } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
        <span className={styles.logoText}>Só Barba</span>
      </div>
      <aside className="sidebar">
        <ul>
          <li className={styles.navItem}>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? styles.activeLink : undefined }
              end
            >
              <BarChart2 className={styles.icon} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/financeiro" 
              className={({ isActive }) => isActive ? styles.activeLink : undefined }
              end
            >
              <DollarSign className={styles.icon} />
              <span>Financeiro</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/task" 
              className={({ isActive }) => isActive ? styles.activeLink : undefined }
            >
              <Scissors className={styles.icon} />
              <span>Serviço</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/person" 
              className={({ isActive }) => isActive ? styles.activeLink : undefined }
            >
              <User className={styles.icon} />
              <span>Cliente</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/product" 
              className={({ isActive }) => isActive ? styles.activeLink : undefined }
            >
              <ShoppingBag className={styles.icon} />
              <span>Produto</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/barbershop" 
              className={({ isActive }) => isActive ? styles.activeLink : undefined }
            >
              <Store className={styles.icon} />
              <span>Barbearia</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/category" 
              className={({ isActive }) => isActive ? styles.activeLink : undefined }
            >
              <Tags className={styles.icon} />
              <span>Categoria</span>
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
