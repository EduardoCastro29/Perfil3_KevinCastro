import React from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

const Register = ({ navigation }) => {
    const { registrar } = useAuth();
    return <AuthForm accion={registrar} registro onSwitch={() => navigation.navigate('Login')} />;
};

export default Register;
