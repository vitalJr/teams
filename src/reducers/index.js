import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import AppReducer from './AppReducer';
import ListaPedidoReducer from './ListaPedidoReducer';
import ListaContatoReducer from './ListaContatoReducer';
import ListaConversaReducer from './ListaConversaReducer';
import ListaConversasReducer from './ListaConversasReducer';

export default combineReducers({
    AutenticacaoReducer: AutenticacaoReducer,
    AppReducer: AppReducer,
    ListaPedidoReducer: ListaPedidoReducer,
    ListaContatoReducer: ListaContatoReducer,
    ListaConversaReducer: ListaConversaReducer,
    ListaConversasReducer: ListaConversasReducer
})