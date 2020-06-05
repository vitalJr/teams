import React from 'react';
import { Router, Scene } from 'react-native-router-flux'

import Loading from './src/login/loading';
import Login from './src/login/login';
import Cadastro from './src/cadastro/cadastro';
import EsqueceuSenha from './src/esqueceuSenha/esqueceuSenha';
import Contato from './src/contato/contato';
import Chat from './src/chat/chat';
import LoadingCadastro from './src/cadastro/loadingcadastro';
import AdicionarContato from './src/chat/adicionarcontato';
import Conversa from './src/chat/conversa';

const Rotas = () => {
  return (
    <Router navigationBarStyle={{ backGroundColor: '#F2F2F2' }} titleStyle={{ color: '#5458af' }}>
      <Scene key="root">
        <Scene key='login' component={Login} title='Teams' />
        <Scene key='loading' component={Loading} hideNavBar={true} />
        <Scene key='loadingcadastro' component={LoadingCadastro} hideNavBar={true} />
        <Scene key='chat' component={Chat} title='Conversas' hideNavBar={true} />
        <Scene key='cadastro' component={Cadastro} title='Cadastro' />
        <Scene key='esqueceusenha' component={EsqueceuSenha} title='Esqueceu a Senha' />
        <Scene key='adicionarcontato' component={AdicionarContato} title='Adicionar Contato' />
        <Scene key='conversa' component={Conversa} title="Teste Conversa"/>
      </Scene>
    </Router>
  );
}

export default Rotas;

