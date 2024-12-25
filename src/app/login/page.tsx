"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginCredentials } from "@/types/User.types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import styles from "@/app/styles/Form.module.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();
  const router = useRouter();

  const onLogin: SubmitHandler<LoginCredentials> = async (data) => {
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      alert("Logged in successfully!");
      router.push("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        alert(err.message);
      } else {
        alert("An unexpected error occurred.");
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Log In</h1>
      <form onSubmit={handleSubmit(onLogin)} className={styles.form}>
        <div className={styles.formItem}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Please enter your email" })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.formItem}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
        <div style={{ marginTop: "2rem" }}>
          <Link href="/">
            <FaArrowLeft />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
