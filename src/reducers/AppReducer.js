const INITIAL_STATE = {
    adicionaContatoEmail: '',
    loadingEnviarPedido: false,
    adicionarContatoErro: false,
    adicionarContatoErroMesmoUsuario: false,
    adicionarContatoSucesso: false,
    mensagem: ''
}

import {
    MODIFICA_ADICIONA_CONTATO_EMAIL,
    ENVIAR_PEDIDO_CONTATO_EMAIL,
    PEDIDO_ENVIADO_SUCESSO,
    PEDIDO_ENVIARO_ERRO,
    DESATIVAR_MENSAGEM_PEDIDO_CONTATO,
    PEDIDO_ENVIARO_ERRO_MESMO_USUARIO,
    MODIFICA_MENSAGEM,
    ENVIAR_MENSAGEM
} from '../actions/types';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MODIFICA_ADICIONA_CONTATO_EMAIL:
            return { ...state, adicionaContatoEmail: action.payload }
        case ENVIAR_PEDIDO_CONTATO_EMAIL:
            return { ...state, adicionaContatoEmail: '', loadingEnviarPedido: true }
        case PEDIDO_ENVIADO_SUCESSO:
            return { ...state, adicionaContatoEmail: '', loadingEnviarPedido: false, adicionarContatoErro: false, adicionarContatoSucesso: true, adicionarContatoErroMesmoUsuario: false }
        case PEDIDO_ENVIARO_ERRO:
            return { ...state, adicionarContatoErro: true, adicionarContatoSucesso: false, loadingEnviarPedido: false, adicionarContatoErroMesmoUsuario: false }
        case DESATIVAR_MENSAGEM_PEDIDO_CONTATO:
            return { ...state, adicionarContatoErro: false, adicionarContatoSucesso: false, adicionarContatoErroMesmoUsuario: false }
        case PEDIDO_ENVIARO_ERRO_MESMO_USUARIO:
            return { ...state, adicionarContatoErroMesmoUsuario: true }
        case MODIFICA_MENSAGEM:
            return { ...state, mensagem: action.payload }
        case ENVIAR_MENSAGEM:
            return { ...state, mensagem: '' }
        default:
            return state
    }
}