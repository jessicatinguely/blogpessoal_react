import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function FormTema() {

    const navigate = useNavigate(); // o useNavigate é um hook do react-router-dom que permite navegar entre páginas programaticamente

    const [isLoading, setIsLoading] = useState<boolean>(false); // isloading tem a função de controlar o carregament, ou seja, enquanto os dados estão sendo buscados, isloading é true e quando os dados são carregados, isloading é false

    const [tema, setTema] = useState<Tema>({} as Tema); // tema é um estado que armazena o tema a ser cadastrado

    const { usuario, handleLogout } = useContext(AuthContext); // Pega o usuário logado do contexto de autenticação para verificar o token

    const token = usuario.token; // Pega o token do usuário logado, se houver

    const { id } = useParams<{ id: string }>(); // Pega o id do tema a ser editado, se houver, serve para editar temas

    async function buscarTemaPorId() {
        try {
            await buscar(`/temas/${id}`, setTema, { // Chama a função buscar para fazer a requisição à API, passando o endpoint, a função para atualizar o estado e o cabeçalho com o token
                headers: {
                    'Authorization': token // Adiciona o token no cabeçalho da requisição para autenticação
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) { // Se o erro for 401 (não autorizado), desloga o usuário e redireciona para a página de login
                handleLogout(); // Desloga o usuário
            }
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId(); // Chama a função buscarTemaPorId para buscar o tema da API quando o componente é montado, se houver id
        }
    }, [id]) // useEffect é um hook do React que executa uma função quando o componente é montado ou quando uma variável de dependência muda. Nesse caso, ele executa a função buscarTemaPorId quando o componente é montado e sempre que o id mudar  

    useEffect(() => {
        if (token === '') { // Se o token for vazio, redireciona o usuário para a página de login
            alert('Você precisa estar logado para acessar essa página.');
            navigate('/');
        }
    }, [token])

    function retornar() {
        navigate('/temas'); // Redireciona o usuário para a página de temas
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) { // Atualiza o estado do tema conforme o usuário digita no formulário
        setTema({
            ...tema,
            [e.target.name]: e.target.value // Atualiza o campo do tema com o valor digitado pelo usuário
        });
    }

    async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Evita o comportamento padrão do formulário que é recarregar a página
        setIsLoading(true); // Inicia o carregamento
        if (id !== undefined) {
            // Atualização 
            try {

                await atualizar(`/temas`, tema, setTema, { // <-- CRASE AQUI
                    headers: { 'Authorization': token }
                  })                  
                alert('Tema atualizado com sucesso!'); // Alerta de sucesso
            } catch (error: any) {
                if (error.toString().includes('401')) { // Se o erro for 401, o token expirou ou é inválido
                    handleLogout(); // Chama a função de logout do contexto de autenticação
                } else {
                    alert('Erro ao atualizaro tema! Verifique os dados e tente novamente.'); // Alerta de erro
                }
            }
        } else {
            // Criar novo tema

            try {

                await cadastrar('/temas', tema, setTema, { // Chama a função cadastrar do service para cadastrar o tema
                    headers: { 'Authorization': token } // Adiciona o token no cabeçalho da requisição para autenticação
                })
                alert('Tema cadastrado com sucesso!'); // Alerta de sucesso
            } catch (error: any) {
                if (error.toString().includes('401')) { // Se o erro for 401, o token expirou ou é inválido
                    handleLogout(); // Chama a função de logout do contexto de autenticação
                } else {
                    alert('Erro ao cadastrar o tema! Verifique os dados e tente novamente.'); // Alerta de erro
                }
            }
        }
        setIsLoading(false); // Finaliza o carregamento
        retornar(); // Redireciona o usuário para a página de temas
    }
    console.log(JSON.stringify(tema));

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar' : 'Atualizar'} Tema
            </h1>
            <form className="w-1/2 flex flex-col gap-4"
                onSubmit={gerarNovoTema}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name="descricao"
                        className="border-2 border-slate-700 rounded p-2"
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-[#FFC8DD]
                       hover:bg-[#FFAFCC] w-1/2 py-2 mx-auto flex justify-center"
                    type="submit"
                >
                    {
                        isLoading ?
                            <ClipLoader
                                color="#FFFFFF"
                                size={24}
                            /> :
                            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormTema;