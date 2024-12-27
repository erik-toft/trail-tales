"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
  updateProfile,
} from "firebase/auth";
import useAuth from "@/hooks/useAuth";
import styles from "@/components/EditUserForm.module.css";
import Link from "next/link";

type EditUserFormProps = {
  setEdit: (value: boolean) => void;
};

type EditUserFormData = {
  username?: string;
  currentPassword?: string;
  newPassword?: string;
};

const EditUserModal: React.FC<EditUserFormProps> = ({ setEdit }) => {
  const { currentUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserFormData>();

  const handleFormSubmit: SubmitHandler<EditUserFormData> = async (data) => {
    setIsUpdating(true);
    setError(null);

    const auth = getAuth();

    try {
      if (data.username && auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: data.username,
        });
        alert("Username updated!");
        setEdit(false);
      }

      if (data.newPassword) {
        if (!data.currentPassword) {
          setError("Current password is required to update password.");
          setIsUpdating(false);
          return;
        }

        if (currentUser && currentUser.email) {
          const credential = EmailAuthProvider.credential(
            currentUser?.email,
            data.currentPassword
          );
          if (auth.currentUser) {
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, data.newPassword);
          }
        }

        alert("Password updated!");
        setEdit(false);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update the username or password. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <form
        className={styles.modalContent}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <button className={styles.closeButton} onClick={() => setEdit(false)}>
          X
        </button>
        <span style={{ textAlign: "center", marginTop: "2rem" }}>
          Edit Profile Form
        </span>
        <label className={styles.formLabel}>Username</label>
        <input
          type="text"
          placeholder={currentUser?.displayName || "Enter your username"}
          {...register("username")}
          className={styles.inputField}
        />
        {errors.username && (
          <p className={styles.errorText}>{errors.username.message}</p>
        )}

        <label className={styles.formLabel}>Current Password</label>
        <input
          type="password"
          placeholder="Current password"
          {...register("currentPassword")}
          className={styles.inputField}
        />
        {errors.currentPassword && (
          <p className={styles.errorText}>{errors.currentPassword.message}</p>
        )}

        <label className={styles.formLabel}>New Password</label>
        <input
          type="password"
          placeholder="New password"
          {...register("newPassword", {
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className={styles.inputField}
        />
        {errors.newPassword && (
          <p className={styles.errorText}>{errors.newPassword.message}</p>
        )}

        {error && <p className={styles.errorText}>{error}</p>}

        <button
          type="submit"
          disabled={isUpdating}
          className={styles.submitButton}
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>

        <button type="button" className={styles.cancelButton}>
          <Link href="/logout">Logout</Link>
        </button>
      </form>
    </div>
  );
};

export default EditUserModal;
