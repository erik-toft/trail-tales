"use client";
import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
import styles from "@/components/Dashboard.module.css";
import SearchField from "./SearchField";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FaCircle, FaUser } from "react-icons/fa";
import EditUserForm from "./EditUserForm";

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
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);

  if (!currentUser) {
    return null;
  }
  const handleEditUserClick = () => {
    setIsEditUserOpen(true);
  };

  const handleAddPinClick = () => {
    setIsAddingPin(!isAddingPin);
  };

  return (
    <>
      <Navbar variant="dark" expand="sm" className="mb-3 ">
        <Container>
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <FaCircle color="#F2A63B" />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 d-flex  align-items-center">
              <div className="d-flex align-items-center  me-auto">
                <Button
                  variant="outline-light"
                  onClick={handleAddPinClick}
                  className={`${
                    isAddingPin ? styles.pulse : styles.addpin
                  } me-2`}
                >
                  Add Pin
                </Button>
                <SearchField onPlaceSelected={onPlaceSelected} />
              </div>

              <div className="ms-auto ">
                <button
                  className={`${styles.icon}`}
                  onClick={() => handleEditUserClick()}
                >
                  <FaUser />
                  {currentUser.displayName && (
                    <div>
                      <span>{currentUser.displayName}</span>
                    </div>
                  )}
                </button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isEditUserOpen && <EditUserForm setEdit={setIsEditUserOpen} />}
    </>
  );
};

export default Dashboard;
