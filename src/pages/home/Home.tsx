

function Home() {


    return (
        <div

            className="bg-[#CDB4DB] flex justify-center"
        >
            {/*  Grid que divide a tela em 2 colunas  */}
            <div

                className="container grid grid-cols-1 sm:grid-cols-2 text-white"
            >
                {/*  Coluna da Esquerda  */}
                <div

                    className="flex flex-col gap-4 items-center justify-center py"
                >
                    <h2
                        className="text-5xl font-bold"
                    >Um lugar para colocar o coração!</h2>
                    <p
                        className="text-xl"
                    >Escreva, compartilhe e se sinta mais leve.</p>

                    {/*Link Botão Nova Postagem*/}
                    <div
                        className="flex justify-around gap-4"
                    >
                        <div
                            className="rounded text-white border-white border-solid border-2 py-2 px-4"
                        >Nova Postagem</div>
                    </div>

                </div>

                {/*  Coluna da Direita  */}
                <div className="flex justify-center">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-2/3"
                    >
                        <source src="/Blog_pessoal.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    )
}

export default Home