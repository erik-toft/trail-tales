"use client";
import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
import styles from "@/components/Dashboard.module.css";
import Link from "next/link";

type DashboardProps = {
  setIsAddingPin: (value: boolean) => void;
};

const Dashboard: React.FC<DashboardProps> = ({ setIsAddingPin }) => {
  const { currentUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!currentUser) {
    return null;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAddPinClick = () => {
    setIsAddingPin(true);
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.dashboardButtonContainer}>
      <button
        className={`${styles.dashboardButton} ${styles.fadeIn}`}
        onClick={toggleMenu}
      >
        Dashboard
      </button>

      <div className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
        <button onClick={() => setMenuOpen(false)}>x</button>
        <button onClick={handleAddPinClick}>Add Pin</button>{" "}
        <Link href="/logout">
          <button>Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
