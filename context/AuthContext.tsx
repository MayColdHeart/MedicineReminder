import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, JSX } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState?: {
        isAuthenticated: boolean | null;
        token: string | null;
    };
    onRegister?: (username: string, email: string, phoneNumber: string, password: string) => Promise<any>;
    onLogin?: (username: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'http://localhost:5163';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [authState, setAuthState] = useState<AuthProps['authState']>({
        isAuthenticated: null,
        token: null,
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (token) {
                setAuthState({
                    isAuthenticated: true,
                    token: token
                });

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        };
        loadToken();
    }, []);

    const onRegister = async (username: string, email: string, phoneNumber: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/accounts/register`, {
                username,
                email,
                phoneNumber,
                password
            });
            return response;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const onLogin = async (username: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/accounts/login`, {
                username,
                password
            });

            console.log('Login response:', response);

            const token: string = response.data.token;

            setAuthState({
                isAuthenticated: true,
                token: token
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, token);
            return response;
        }
        catch (error) {
            console.error('Login error:', error);
            setAuthState({
                isAuthenticated: false,
                token: null
            });
            throw error;
        }
    };

    const onLogout = async () => {
        setAuthState({
            isAuthenticated: false,
            token: null
        });

        axios.defaults.headers.common['Authorization'] = '';
        await SecureStore.deleteItemAsync(TOKEN_KEY);
    };

    return (
        <AuthContext.Provider value={{ authState, onRegister, onLogin, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
