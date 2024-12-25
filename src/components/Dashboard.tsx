"use client";
import React from "react";
import useAuth from "@/hooks/useAuth";
import styles from "@/components/Dashboard.module.css";
import Link from "next/link";
import SearchField from "./SearchField";

type DashboardProps = {
  setIsAddingPin: (value: boolean) => void;
  onPlaceSelected: (lat: number, lng: number) => void;
  isAddingPin: boolean;
};

const Dashboard: React.FC<DashboardProps> = ({
  setIsAddingPin,
  onPlaceSelected,
  isAddingPin,
}) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  const handleAddPinClick = () => {
    setIsAddingPin(!isAddingPin);
  };

  return (
    <div className={styles.dashboardButtonContainer}>
      <div className={`${styles.menu} ${styles.open}`}>
        <button
          onClick={handleAddPinClick}
          className={!isAddingPin ? styles.add : styles.pulse}
        >
          Add Pin
        </button>
        <SearchField onPlaceSelected={onPlaceSelected} />
        <Link className={styles.logout} href="/logout">
          <button>Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
