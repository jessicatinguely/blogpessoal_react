import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {

  const navigate = useNavigate(); // o useNavigate é um hook do react-router-dom que permite navegar entre páginas programaticamente

  const [isLoading, setIsLoading] = useState<boolean>(false); // controla carregamento

  const [tema, setTema] = useState<Tema>({} as Tema); // tema é um estado que armazena o tema a ser exibido/deletado

  const { usuario, handleLogout } = useContext(AuthContext); // pega o usuário logado do contexto de autenticação

  const token = usuario.token; // token do usuário logado

  const { id } = useParams<{ id: string }>(); // id do tema a ser deletado

  async function buscarTemaPorId() {
    try {
      await buscar(`/temas/${id}`, setTema, { // busca tema por id
        headers: {
          'Authorization': token
        }
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
        navigate('/login');
      }
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarTemaPorId();
    }
  }, [id]); 

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado para acessar essa página.','info');
      navigate('/');
    }
  }, [token]);

  function retornar() {
    navigate('/temas'); // volta para a lista de temas
  }

  async function deletarTema() {
    setIsLoading(true);

    try {
      await deletar(`/temas/${id}`, {
        headers: {
          'Authorization': token
        }
      });
      ToastAlerta('Tema deletado com sucesso', 'sucesso');
      retornar();
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
        navigate('/login');
      } else {
        ToastAlerta('Erro ao deletar tema', 'erro');
      }
    } finally { 
      setIsLoading(false); // para de carregar
    }
  }

  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4'>Deletar tema</h1>

      <p className='text-center font-semibold mb-4'>
        Você tem certeza de que deseja apagar o tema a seguir?
      </p>

      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header
          className='py-2 px-6 bg-[#ffafcc] text-white font-bold text-2xl'>
          Tema
        </header>

        <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>

        <div className="flex">
          <button
            className='text-slate-100 bg-red-200 hover:bg-red-300 w-full py-2'
            onClick={retornar}
          >
            Não
          </button>

          <button
            className='w-full text-slate-100 bg-[#ffc8dd]
                       hover:bg-[#ffafcc] flex items-center justify-center'
            onClick={deletarTema}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader
                color="#FFFFFF"
                size={24}
              />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarTema;