interface AuthState {
  isAuthenticated: boolean;
  user: null;
}

const useAuth = (): AuthState => ({ isAuthenticated: false, user: null });

export default useAuth;
