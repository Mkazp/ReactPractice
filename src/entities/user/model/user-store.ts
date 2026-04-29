import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  login: string;
}

interface AuthState {
  user: User | null;
  login: (login: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
}

const API_URL = "http://localhost:5005/api";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (login, password) => {
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login, password }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error);
        }
        const data = await res.json();
        const userRes = await fetch(`${API_URL}/user/${data.userId}`);
        const userData = await userRes.json();
        set({ user: { id: data.userId, ...userData, login } });
      },
      register: async (data) => {
        const res = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error);
        }
        await useAuthStore.getState().login(data.login, data.password);
      },
      logout: () => set({ user: null }),
    }),
    { name: "auth-storage" }
  )
);
