export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgotPassword {
  email:string
}

export interface ResetPasswordFormData {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
};
