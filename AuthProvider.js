import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true };
    case 'LOGOUT':
      return { isAuthenticated: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = () => {
    dispatch({ type: 'LOGIN' });
    AsyncStorage.setItem('isAuthenticated', 'true'); // Convert to string
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    AsyncStorage.setItem('isAuthenticated', 'false'); // Convert to string
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
        if (isAuthenticated === 'true') {
          login();
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: state.isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
