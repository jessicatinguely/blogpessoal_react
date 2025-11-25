
import ListaPostagens from "../../components/postagem/listapostagem/ListaPostagens";
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem";

function Home() {
  return (
    <>
      <div className="bg-[#CDB4DB] flex justify-center">
        {/* Grid que divide a tela em 2 colunas */}
        <div className="container grid grid-cols-1 sm:grid-cols-2 text-white">
          {/* Coluna da Esquerda */}
          <div className="flex flex-col gap-4 items-center justify-center py-8">
            <h2 className="text-5xl font-bold">
              Um lugar para colocar o coração!
            </h2>
            <p className="text-xl">
              Escreva, compartilhe e se sinta mais leve.
            </p>

            {/* Botão Nova Postagem */}
            <div className="flex justify-around gap-4">
              <ModalPostagem />
            </div>
          </div>

          {/* Coluna da Direita */}
          <div className="flex justify-center items-center py-8">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-2/3"
            >
              <source
                src="https://ik.imagekit.io/hnkqnvn7cu/Blog_pessoal.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>

      <ListaPostagens />
    </>
  );
}

export default Home;