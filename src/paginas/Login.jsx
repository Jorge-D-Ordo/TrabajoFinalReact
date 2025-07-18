import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../estructura/Header';
import Footer from '../estructura/Footer';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form } from 'react-bootstrap';
import styles from './Login.module.css';
import Botones from '../componentes/Botones';

const Login = () => {
    const { isAuthenticated, login, logout } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const user = await login(email, password);
        if (user) {
            toast.success(`✅ Bienvenido ${user.rol}`);
            user.rol === 'admin' ? navigate('/Admin') : navigate(-1);
        } else {
            toast.error('❌ Credenciales inválidas');
        }
    };

    const handleLogout = () => logout();

    const handleResetPassword = () => {
        toast.info('🔄 Iniciando blanqueo de clave');
    };

    const handleRegister = () => {
        toast.info('✏️ Saltando al formulario de registro');
    };

    const handleCancel = () => navigate(-1);

    return (
        <>
            <Header />
            <main className={styles.mainLogin}>
                <Container fluid>
                    <Row className="justify-content-center mt-4">
                        <Col xs={12} sm={10} md={8} lg={6} >
                            <div className={styles.loginCard}>

                                <h1 className={styles.titulo}>

                                    {isAuthenticated ? '✅ Estás logueado' : 'Login'}
                                </h1>



                                {!isAuthenticated ? (
                                    <>
                                        <Form.Group className="mb-3 d-flex flex-column flex-sm-row align-items-center gap-2 mt-3">
                                            <Form.Control
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <Botones
                                                texto="Registrarme"
                                                color="#854dff"
                                                ancho="300px"
                                                onClick={handleRegister}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-5 d-flex flex-column flex-sm-row align-items-center gap-2">
                                            <Form.Control
                                                type="password"
                                                placeholder="Contraseña"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <Botones
                                                texto="Olvidé mi contraseña"
                                                color="#854dff"
                                                ancho="300px"
                                                onClick={handleResetPassword}
                                            />
                                        </Form.Group>

                                        <div className="d-flex justify-content-center gap-4 mb-1">
                                            <Botones
                                                texto="Continuar"
                                                color="#854dff"
                                                ancho="130px"
                                                onClick={handleLogin}
                                            />
                                            <Botones
                                                texto="Cancelar"
                                                color="#d47ce7"
                                                ancho="130px"
                                                onClick={handleCancel}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center mt-4">
                                        <Botones
                                            texto="Cerrar sesión"
                                            color="#b76ad8"
                                            ancho="160px"
                                            onClick={handleLogout}
                                        />
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
            <Footer />
        </>
    );
};

export default Login;
