import axios from "axios";

const api = axios.create({
    baseURL:'https://blogpessoal-jaek.onrender.com'
});

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function ) => { 
    const resposta = await api.post(url, dados); // faz uma requisição POST para a URL fornecida com os dados fornecidos
    setDados(resposta.data); // atualiza o estado com os dados da resposta, variável de estado passada como parâmetro
}

export const login = async (url: string, dados: Object, setDados: Function ) => { 
    const resposta = await api.post(url, dados); // faz uma requisição POST para a URL fornecida com os dados fornecidos
    setDados(resposta.data); // atualiza o estado com os dados da resposta, variável de estado passada como parâmetro
}
