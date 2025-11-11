

function Home() {
    return (
        <div
            style={{
                backgroundColor: "#312e81",
                display: "flex",
                justifyContent: "center"

            }}
        >
            {/*  Grid que divide a tela em 2 colunas  */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    color: "white",
                    width: "100%",
                    maxWidth: "1280px",
                }}
            >
                {/*  Coluna da Esquerda  */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "2.5rem",
                            fontWeight: "bold",
                        }}
                    >Seja Bem Vinde!</h2>
                    <p
                        style={{
                            fontSize: "1.25rem",
                            textAlign: "center",
                        }}
                    >Expresse aqui seus pensamentos e opiniões</p>

                    {/*Link Botão Nova Postagem*/}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            gap: "1rem",
                        }}
                    >
                        <div
                            style={{
                                borderRadius: "0.5rem",
                                color: "white",
                                border: "2px solid white",
                                padding: "0.5rem 1rem",
                            }}
                        >Nova Postagem</div>
                    </div>

                </div>

                {/*  Coluna da Direita  */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src="https://i.imgur.com/fyfri1v.png"
                        alt="Imagem da página inicial"
                        style={{
                            width: "66%"
                        }}
                    />


                </div>

            </div>
        </div>
    )
}

export default Home