import React from "react";
import styles from "./PinMenu.module.css";

interface Button {
  label: string;
  onClick: () => void;
}

interface PinMenuProps {
  buttons: Button[];
}

const PinMenu: React.FC<PinMenuProps> = ({ buttons }) => {
  return (
    <div className={styles.pinMenu}>
      {buttons.map((button, index) => (
        <button
          key={index}
          className={styles.pinButton}
          onClick={button.onClick}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default PinMenu;
