"use client";

import { useState } from "react"; // För att hantera menystatus
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import styles from "@/components/DashboardButton.module.css";

const DashboardButton = () => {
  const { currentUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false); // Menystatus (öppen/stängd)

  if (!currentUser) {
    return null;
  }

  const toggleMenu = () => {
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
        <Link href="/profile">
          <button>Profile</button>
        </Link>
        <Link href="/settings">
          <button>Settings</button>
        </Link>
        <Link href="/logout">
          <button>Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardButton;
