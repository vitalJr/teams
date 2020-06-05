import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
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
} from './types'

export const modificaEmail = (email) => {
    return {
        type: MODIFICA_EMAIL,
        payload: email
    }
}

export const modificaSenha = (senha) => {
    return {
        type: MODIFICA_SENHA,
        payload: senha
    }
}

export const modificaNome = (nome) => {
    return {
        type: MODIFICA_NOME,
        payload: nome
    }
}

export const cadastraUsuario = ({ nome, email, senha }) => {
    return dispatch => {

        Actions.loadingcadastro();
        dispatch({ type: CADASTRO_EM_ANDAMENTO, payload: true })

        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                var emailB64 = b64.encode(email);
                firebase.database().ref(`/contatos/${emailB64}`)
                    .push({ nome: nome })
                    .then(value => cadastroUsuarioSucesso(dispatch))
            })
            .catch(error => { cadastroUsuarioErro(error, dispatch) })
    }
}

const cadastroUsuarioSucesso = (dispatch) => {
    dispatch({ type: CADASTRO_USUARIO_SUCESSO, payload: 'Usuário Cadastrado com sucesso!' })
    setTimeout(function () { Actions.login(); }, 2000);
}

const cadastroUsuarioErro = (erro, dispatch) => {
    dispatch({ type: CADASTRO_USUSARIO_ERRO, payload: erro.message });
    setTimeout(function () { Actions.cadastro(); }, 1000);

}

export const autenticarUsuario = (email, senha) => {
    return dispatch => {

        dispatch({ type: LOGIN_EM_ANDAMENTO, payload: true })
        Actions.loading();
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(user => {
                autenticarUsuarioSucesso(dispatch);

                setTimeout(function () { Actions.chat(); }, 1000);

            })
            .catch(erro => {
                autenticarUsuarioErro(erro, dispatch);
                setTimeout(function () { Actions.login(); }, 1000);
            })


    }
}

const autenticarUsuarioSucesso = (dispatch) => {
    dispatch({ type: AUTENTICACAO_USUARIO_SUCESSO, payload: 'Usuario autenticado com sucesso!' });
}

const autenticarUsuarioErro = (erro, dispatch) => {
    dispatch({ type: AUTENTICACAO_USUARIO_ERRO, payload: erro.message })
}





