import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../estructura/Header';
import Footer from '../estructura/Footer';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const { isAuthenticated, login, logout, usuario } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const user = await login(email, password);
        if (user) {
            toast.success(`✅ Bienvenido ${user.rol}`);
            if (user.rol === 'admin') {
                navigate('/Admin');
            } else {
                navigate(-1);
            }
        } else {
            toast.error('❌ Credenciales inválidas');
        }
    };

    const handleLogout = () => {
        logout();
    };

    const handleResetPassword = () => {
        toast.info('🔄 Iniciando blanqueo de clave');
    };

    const handleRegister = () => {
        toast.info('✏️ Saltando al formulario de registro');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <>
            <Header />
            <main style={{ paddingTop: '115px', textAlign: 'center' }}>
                <h1>Login</h1>
                <h2>{isAuthenticated ? '✅ Estás logueado' : '❌ No estás logueado'}</h2>

                {!isAuthenticated ? (
                    <div style={{ marginTop: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button onClick={handleRegister}>Registrarme</button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button onClick={handleResetPassword}>Olvidé mi contraseña</button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                            <button onClick={handleLogin}>Continuar</button>
                            <button onClick={handleCancel}>Cancelar</button>
                        </div>
                    </div>
                ) : (
                    <button onClick={handleLogout}>Cerrar sesión</button>
                )}
            </main>
            <Footer />
        </>
    );
};

export default Login;
