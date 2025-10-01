import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) =>
        set(
          { user, isAuthenticated: true, error: null },
          false,
          "auth/setUser",
        ),

      clearUser: () =>
        set(
          { user: null, isAuthenticated: false, error: null },
          false,
          "auth/clearUser",
        ),

      setLoading: (isLoading) => set({ isLoading }, false, "auth/setLoading"),

      setError: (error) => set({ error }, false, "auth/setError"),
    }),
    {
      name: "auth-store",
    },
  ),
);
