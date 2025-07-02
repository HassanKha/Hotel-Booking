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
export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  userName: string;
  country: string;
  profileImage: File | null;
  role?: string;
}