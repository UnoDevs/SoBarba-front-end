import React from "react";
import styles from "./Sidebar.module.css";
import { FaHome, FaChartBar, FaFolderOpen, FaBoxOpen, FaUsers } from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>LOGO</div>
        <aside className="sidebar">
            <ul>
                <li className={styles.navItem}>
                    <FaHome className={styles.icon} /><span>Home</span>
                </li>
                <li className={styles.navItem}>
                    <FaChartBar className={styles.icon} /><span>Dashboard</span>
                </li>
                <li className={styles.navItem}>
                    <FaFolderOpen className={styles.icon} /><span>Orders</span>
                </li>
                <li className={styles.navItem}>
                    <FaBoxOpen className={styles.icon} /><span>Products</span>
                </li>
                <li className={styles.navItem}>
                    <FaUsers className={styles.icon} /><span>Customers</span>
                </li>
            </ul>
        </aside>
    </div>
  );
};

export default Sidebar;