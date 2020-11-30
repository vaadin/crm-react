import React, { createContext, useEffect, useReducer } from 'react';
import type { FC, ReactNode } from 'react';
import SplashScreen from '../components/SplashScreen';
import axios from '../utils';

interface AuthState {
  isInitialised: boolean;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
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

type Action = InitialiseAction | LoginAction | LogoutAction;

const initialAuthState: AuthState = {
  isInitialised: false,
  isAuthenticated: false
};

const setSession = (accessToken: string | null): void => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `${accessToken}`;
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
        isInitialised: true,
        isAuthenticated
      };
    }
    case 'LOGIN': {
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
  logout: () => {}
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

  useEffect(() => {
    const initialise = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

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

  if (!state.isInitialised) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
