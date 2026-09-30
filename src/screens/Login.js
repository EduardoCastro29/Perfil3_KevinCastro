import React from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

const Login = ({ navigation }) => {
    const { iniciarSesion } = useAuth();
    return <AuthForm accion={iniciarSesion} onSwitch={() => navigation.navigate('Register')} />;
};

export default Login;
