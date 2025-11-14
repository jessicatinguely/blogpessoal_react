import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";


interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProvideProps {
    children: ReactNode // Aceita qualquer conteúdo válido do React como filho
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProvideProps) { // Componente que envolve outros componentes para fornecer o contexto de autenticação

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    })

    // Inicializar o Estado isLoading (Exibir e Ocultar o loader no FOrmulário de login)
    const [isLoading, setIsLoading] = useState<boolean>(false);


    //Implementação da Função logon (Autenticação no Backend)
    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true);

        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario);
            alert('Usuário autenticado com sucesso!');
        } catch (error) {
            alert("Os dados do usuário estão inconsistentes!");
        }

        setIsLoading(false);
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: ''
        });

    }

        return (
            <AuthContext.Provider value={{ usuario, handleLogout, handleLogin, isLoading }}>
                {children}
            </AuthContext.Provider>
        )
    }



