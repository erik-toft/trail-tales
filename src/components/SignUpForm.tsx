"use client";

import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface SignupCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormProps {
  onSignup: SubmitHandler<SignupCredentials>;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SignupCredentials>();

  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const onSignupSubmit: SubmitHandler<SignupCredentials> = async (data) => {
    setIsSubmitting(true);
    await onSignup(data);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSignupSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required.",
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long.",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "You must confirm your password.",
            validate: (value) =>
              value === passwordRef.current || "Passwords do not match.",
          })}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
};

export default SignupForm;
