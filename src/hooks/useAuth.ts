import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const useAuth = () => useContext(AuthContext);

// interface AuthState {
//   isAuthenticated: boolean;
//   user: null;
// }

// const useAuth = (): AuthState => ({ isAuthenticated: false, user: null });

export default useAuth;
