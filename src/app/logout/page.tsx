"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/services/firebase";
import styles from "@/app/styles/Form.module.css";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await auth.signOut();
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push("/login");
      } catch (err) {
        console.error("Logout failed", err);
      }
    };
    logoutUser();
  }, [router]);

  return (
    <div className={styles.header}>
      <h1>Log Out</h1>
      <p>Please wait while youre being logged out...</p>
    </div>
  );
};

export default LogoutPage;
