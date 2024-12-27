export type LoginCredentials = {
  email: string;
  password: string;
  username?: string;
};

export type SignupCredentials = {
  email: string;
  password: string;
  confirmPassword: string;
};
