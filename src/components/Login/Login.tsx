import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import logo from "../../assets/logo-sFundo.png";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!email || !senha) {
            setMensagem("Preencha todos os campos.");
            return;
        }

        if (email === 'teste@gmail.com' && senha === '1234') {
            setMensagem('Login simulado com sucesso!');
            navigate('/dashboard');
        } else {
            setMensagem("Senha inválida, tente novamente!");
        }

    };

    return (
        <div className={styles.container}>
            <img src={logo} alt="Logo" className={styles.logo} />

            <div className={styles.rightPanel}>
                <div className={styles.formContainer}>
                    <h2>SóBarba</h2>
                    <input
                        type="email"
                        placeholder="E-mail:"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Senha:"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className={styles.input}
                    />
                    <button onClick={handleLogin} className={styles.loginButton}>
                        Login
                    </button>
                    {mensagem && <p className={styles.message}>{mensagem}</p>}
                </div>
            </div>
        </div>
    );
}

export default Login;
