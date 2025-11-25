import { useNavigate } from "react-router-dom";
import CardTema from "../cardtema/CardTema"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import type Tema from "../../../models/Tema";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaTemas() {

  const navigate = useNavigate(); // o useNavigate é um hook do react-router-dom que permite navegar entre páginas programaticamente

  const [isLoading, setIsLoading] = useState<boolean>(false); // isloading tem a função de controlar o carregament, ou seja, enquanto os dados estão sendo buscados, isloading é true e quando os dados são carregados, isloading é false

  const [temas, setTemas] = useState<Tema[]>([]); // temas é um estado que armazena a lista de temas buscados da API

  //Pegar token da context

  const { usuario, handleLogout } = useContext(AuthContext); // Pega o usuário logado do contexto de autenticação para verificar o token

  const token = usuario.token; // Pega o token do usuário logado, se houver

useEffect(() => {
  if(token === '') { // Se o token for vazio, redireciona o usuário para a página de login
    ToastAlerta('Você precisa estar logado para acessar essa página.', 'info');
    navigate('/');
  }
}, [token])

  useEffect(() => {
    buscarTemas(); // Chama a função buscarTemas para buscar os temas da API quando o componente é montado ou quando o tamanho da lista de temas mudar  
  }, [temas.length]); // useEffect é um hook do React que executa uma função quando o componente é montado ou quando uma variável de dependência muda. Nesse caso, ele executa a função buscarTemas quando o componente é montado e sempre que o tamanho da lista de temas mudar

  //Mandar a requisicao para a API

  async function buscarTemas() {
    try {
      setIsLoading(true); // Define isLoading como true para indicar que a busca está em andamento

      await buscar('/temas', setTemas, { // Chama a função buscar para fazer a requisição à API, passando o endpoint, a função para atualizar o estado e o cabeçalho com o token
        headers: {
          'Authorization': token // Adiciona o token no cabeçalho da requisição para autenticação
        }
      })

    } catch (error: any) {
      if (error.toString().includes('401')) { // Se o erro for 401 (não autorizado), desloga o usuário e redireciona para a página de login
        handleLogout(); // Desloga o usuário
      }
    } finally {
      setIsLoading(false); // Define isLoading como false para indicar que a busca foi concluída
    }

  }

  return (
    <>
      {
        isLoading && ( // Se isLoading for true, exibe o loader de carregamento
          <div className="flex justify-center w-full my-8">
            <SyncLoader
              color="#FFAFCC"
              size={32}
            />
          </div>
        )
      }
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {
            (!isLoading && temas.length === 0) && ( // Se isLoading for false e não houver temas, exibe a mensagem de nenhum tema encontrado
              <span className="text-3xl text-center my-8">
                Nenhum tema foi encontrado.
              </span> // span serve para exibir texto na tela, nao usamos div pq div é um container de blocos e span é um container de linha, ou seja, span é mais adequado para textos
            )
          }
          <div className="grid grid-cols-1 md:grid-cols-2 
                          lg:grid-cols-3 gap-8">

            {
              temas.map((tema) => (
                <CardTema key={tema.id} tema={tema} />
              ))

            }

          </div>
        </div>
      </div>
    </>
  )
}
export default ListaTemas;