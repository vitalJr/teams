import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import _ from 'lodash';

import {
    MODIFICA_ADICIONA_CONTATO_EMAIL,
    ENVIAR_PEDIDO_CONTATO_EMAIL,
    PEDIDO_ENVIADO_SUCESSO,
    PEDIDO_ENVIARO_ERRO,
    DESATIVAR_MENSAGEM_PEDIDO_CONTATO,
    LISTA_PEDIDO_USUARIO,
    PEDIDO_ENVIARO_ERRO_MESMO_USUARIO,
    LISTA_CONTATO_USUARIO,
    MODIFICA_MENSAGEM,
    LISTA_CONVERSA_USUARIO,
    ENVIAR_MENSAGEM,
    LISTA_CONVERSAS_USUARIO
} from './types';

export const modificaAdicionaContatoEmail = (email) => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: email
    };
}

export const enviarPedidoContatoEmail = (email) => {
    return dispatch => {
        var emailB64 = b64.encode(email);
        const { currentUser } = firebase.auth();
        var emailSolicitanteb64 = b64.encode(currentUser.email);
        if (currentUser.email === email) {
            pedidoEnviadoErroMesmoUsuario(dispatch);
        } else {

            firebase.database().ref('/contatos/' + emailSolicitanteb64)
                .once('value')
                .then(snapshot => {
                    if (snapshot.val()) {
                        const dadosUsuarioSolicitante = _.first(_.values(snapshot.val()));

                        firebase.database().ref('/contatos/' + emailB64)
                            .once('value')
                            .then(snapshot2 => {
                                if (snapshot2.val()) {
                                    dispatch({ type: ENVIAR_PEDIDO_CONTATO_EMAIL });
                                    // first -> extrai a informação do valor quando so tem um elemento;
                                    // values -> tras os valores em um array.
                                    // const dadosUsuario = _.first(_values(snapshot.val()));
                                    var emailPedido = b64.encode(email);
                                    firebase.database().ref("/pedidos/" + emailPedido)
                                        .push({
                                            email: currentUser.email,
                                            nome: dadosUsuarioSolicitante.nome
                                        })
                                        .then(() => {
                                            pedidoEnviadoSucesso(dispatch);

                                        })
                                } else {
                                    pedidoEnviadoErro(dispatch);
                                }
                            });

                    }
                })

        }
    }

}

const pedidoEnviadoSucesso = (dispatch) => {
    dispatch({ type: PEDIDO_ENVIADO_SUCESSO })
    setTimeout(function () { dispatch({ type: DESATIVAR_MENSAGEM_PEDIDO_CONTATO }) }, 8000);

}

const pedidoEnviadoErro = (dispatch) => {
    dispatch({ type: PEDIDO_ENVIARO_ERRO })
}

const pedidoEnviadoErroMesmoUsuario = (dispatch) => {
    dispatch({ type: PEDIDO_ENVIARO_ERRO_MESMO_USUARIO })
}

export const pedidosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        var emailUsuarioB64 = b64.encode(currentUser.email);
        firebase.database().ref('/pedidos/' + emailUsuarioB64)
            .on('value', snapshot => {
                dispatch({ type: LISTA_PEDIDO_USUARIO, payload: snapshot.val() })
            })

    }
}

export const contatoUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        var emailUsuarioB64 = b64.encode(currentUser.email);
        firebase.database().ref('/usuario_contato/' + emailUsuarioB64)
            .on('value', snapshot => {
                dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() })
            })

    }
}

export const aceitarPedido = (item, uid) => {
    const { currentUser } = firebase.auth();

    var emailAceito = b64.encode(item.email);
    var emailResposta = b64.encode(currentUser.email);

    return dispatch => {

        firebase.database().ref('/usuario_contato/' + emailResposta)
            .push({
                email: item.email,
                nome: item.nome
            })
            .then(snapshot => {
                firebase.database().ref('/contatos/' + emailResposta)
                    .once('value')
                    .then(snapshot2 => {

                        const dadosUsuarioSolicitante = _.first(_.values(snapshot2.val()));
                        firebase.database().ref('/usuario_contato/' + emailAceito)
                            .push({
                                email: currentUser.email,
                                nome: dadosUsuarioSolicitante.nome
                            })
                            .then(snapshot => {
                                var pedidos = firebase.database().ref("/pedidos/" + emailResposta);
                                pedidos.child(uid).remove();

                            })

                    })

            })
    }
}

const usuarioAceitoSucesso = (dispatch) => {
    dispatch({ type: USUARIO_ACEITO_SUCESSO, payload: 'Usuário aceito, agora vocês poderam conversar' });
}

const usuarioAceitoErro = (dispatch) => {
    dispatch({ type: USUARIO_ACEITO_ERRO, payload: 'Ocorreu um erro ao tentar aceitar o usuário' });
}

export const recusarPedido = (uid) => {
    return dispatch => {
        var { currentUser } = firebase.auth();
        var emailResposta = b64.encode(currentUser.email);
        var pedidos = firebase.database().ref("/pedidos/" + emailResposta);
        pedidos.child(uid).remove();

    }
}

export const modificaMensagem = (texto) => {
    return ({
        type: MODIFICA_MENSAGEM,
        payload: texto
    })
}

export const enviarMensagem = (mensagem, contatoNome, contatoEmail) => {

    //dados do contato (contatoNome e contatoEmail)
    //dados do usuário autenticado (currentUser)
    var { currentUser } = firebase.auth();
    var usuarioEmail = currentUser.email;
    return dispatch => {
        //converter para base 64
        var usuarioEmailB64 = b64.encode(usuarioEmail);
        var contatoEmailB64 = b64.encode(contatoEmail);

        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .push({ mensagem: mensagem, tipo: 'e' })
            .then(() => {
                firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
                    .push({ mensagem: mensagem, tipo: 'r' })
                    .then(() => {
                        dispatch({ type: ENVIAR_MENSAGEM, payload: '' });
                    })
                    .then(() => { //cabeçalho de conversa do usuário autenticado
                        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                            .set({ nome: contatoNome, email: contatoEmail, mensagem: mensagem })
                            .then(() => { // cabeçalho de conversa do contato
                                dispatch({ type: ENVIAR_MENSAGEM, payload: '' });
                                firebase.database().ref(`/contatos/${usuarioEmailB64}`)
                                    .once('value')
                                    .then((snapshot) => {
                                        var dadosUsuario = _.first(_.values(snapshot.val()));
                                        firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                                            .set({ nome: dadosUsuario.nome, email: usuarioEmail, mensagem: mensagem })
                                            .then(() => {
                                               
                                            })

                                    })


                            })
                    })
            })
    }
}

export const conversaUsuarioFetch = (contatoEmail) => {
    const { currentUser } = firebase.auth();
    var emailUsuarioB64 = b64.encode(currentUser.email);
    var emailContatoB64 = b64.encode(contatoEmail);

    return (dispatch) => {

        firebase.database().ref(`/mensagens/${emailUsuarioB64}/${emailContatoB64}`)
            .on('value', snapshot => {
                dispatch({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.val() })
            })

    }
}

export const conversasUsuarioFetch = () => {
    const { currentUser } = firebase.auth();
    var emailUsuarioB64 = b64.encode(currentUser.email);

    return (dispatch) => {

        firebase.database().ref(`/usuario_conversas/${emailUsuarioB64}`)
            .on('value', snapshot => {
                dispatch({ type: LISTA_CONVERSAS_USUARIO, payload: snapshot.val() })
            })

    }
}