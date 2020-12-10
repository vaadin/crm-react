import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const useAuth: any = () => useContext(AuthContext);

export default useAuth;
