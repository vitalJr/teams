import {
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    MODIFICA_NOME,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUSARIO_ERRO,
    AUTENTICACAO_USUARIO_SUCESSO,
    AUTENTICACAO_USUARIO_ERRO,
    LOGIN_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO
} from '../actions/types';

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    erroCadastro: '',
    erroAutenticarUsuario: '',
    loadingLogin: false,
    loadingCadastro: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MODIFICA_EMAIL:
            return { ...state, email: action.payload }
        case MODIFICA_SENHA:
            return { ...state, senha: action.payload }
        case MODIFICA_NOME:
            return { ...state, nome: action.payload }
        case CADASTRO_USUARIO_SUCESSO:
            return { ...state, erroCadastro: action.payload, email: '', senha: '',loadingCadastro:false }
        case CADASTRO_USUSARIO_ERRO:
            return { ...state, erroCadastro: action.payload, loadingCadastro:false }
        case AUTENTICACAO_USUARIO_SUCESSO:
            return { ...state, erroAutenticarUsuario: '', senha: '', loadingLogin: false }
        case AUTENTICACAO_USUARIO_ERRO:
            return { ...state, erroAutenticarUsuario: action.payload, senha: '', loadingLogin: false }
        case LOGIN_EM_ANDAMENTO:
            return { ...state, loadingLogin: true }
        case CADASTRO_EM_ANDAMENTO:
            return { ...state, loadingCadastro: true }
    }
    return state;
}