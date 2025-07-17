import { useState, useContext, createContext } from 'react';

const LoginContext = createContext();

function LoginProvider({ children }) {
    const [login, setLogin] = useState(null);

    const handleLogin = () => {
        setLogin();
    };
    return <LoginContext.Provider value={login}>{children}</LoginContext.Provider>;
}

export default LoginProvider;
