"use client";

import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignupCredentials } from "@/types/User.types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/Form.module.css";

const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupCredentials>();
  const router = useRouter();

  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const onSignup: SubmitHandler<SignupCredentials> = async (data) => {
    setIsSubmitting(true);

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      alert("Account created successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create account. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <h1 className={styles.header}>Register</h1>
      <form onSubmit={handleSubmit(onSignup)} className={styles.form}>
        {/* Email */}
        <div className={styles.formItem}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Please enter your email" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className={styles.formItem}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Please enter a password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className={styles.formItem}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === passwordRef.current || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Register"}
        </button>
        <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
          ----- OR -----
        </p>
        <div
          style={{
            textAlign: "center",
            marginTop: "0.5rem",
            border: "1px solid green",
          }}
        >
          <a href="/login">Log In</a>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
