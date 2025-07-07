
 export interface User {
  _id: string;
  userName: string;
  role: string;
}

export interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}
