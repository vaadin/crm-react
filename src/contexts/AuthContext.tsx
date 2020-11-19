import React, { createContext, useEffect, useReducer } from 'react';
import type { FC, ReactNode } from 'react';
import axios from '../utils';

interface AuthState {
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, password: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitialiseAction = {
  type: 'INITIALISE';
  payload: {
    isAuthenticated: boolean;
  };
};

type LoginAction = {
  type: 'LOGIN';
};

type LogoutAction = {
  type: 'LOGOUT';
};

type RegisterAction = {
  type: 'REGISTER';
};

type Action = InitialiseAction | LoginAction | LogoutAction | RegisterAction;

const initialAuthState: AuthState = {
  isAuthenticated: false
};

const setSession = (accessToken: string | null): void => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'INITIALISE': {
      const { isAuthenticated } = action.payload;

      return {
        ...state,
        isAuthenticated
      };
    }
    case 'LOGIN':
    case 'REGISTER': {
      return {
        ...state,
        isAuthenticated: true
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext<AuthContextValue>({
  ...initialAuthState,
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve()
});

export const AuthProvider: FC<AuthProviderProps> = ({ children = null }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const login = async (name: string, password: string) => {
    const response = await axios.post<{ accessToken: string }>(
      `${process.env.REACT_APP_BASE_API}/login`,
      {
        name,
        password
      }
    );

    setSession(response.headers.authorization);
    dispatch({
      type: 'LOGIN'
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (name: string, password: string) => {
    const response = await axios.post<{ accessToken: string }>('/signup', {
      name,
      password
    });

    window.localStorage.setItem('accessToken', response.headers.authorization);

    dispatch({
      type: 'REGISTER'
    });
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        console.log(accessToken);

        if (accessToken) {
          setSession(accessToken);

          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: true
            }
          });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: false
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALISE',
          payload: {
            isAuthenticated: false
          }
        });
      }
    };

    initialise();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
