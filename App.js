import firebase from 'firebase';
import React, { Component } from 'react';
import Rotas from './rotas';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers/index';
import ReduxThunk from 'redux-thunk';
console.disableYellowBox = true;


class App extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyChr_7Arj0Yos9sYgpie6UkEDF1_D8uEiQ",
      authDomain: "teams-fc3ac.firebaseapp.com",
      databaseURL: "https://teams-fc3ac.firebaseio.com",
      projectId: "teams-fc3ac",
      storageBucket: "teams-fc3ac.appspot.com",
      messagingSenderId: "768620138569",
      appId: "1:768620138569:web:2f5f78747fedcd28ea2f98",
      measurementId: "G-7PXV5RD40Z"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  // salvarDados() {
  //   var funcionarios = firebase.database().ref("funcionarios");
  //   funcionarios.push().set(
  //     {
  //       nome: "Vital",
  //       sobrenome: "Camilo"
  //     })
  //   // funcionarios.child("001").child("nome").set("Vital");
  //   //Salvar e alterar nós
  //   // database.ref("pontuacao").set("200");
  // }

  // removerDados() {
  //   var funcionarios = firebase.database().ref("funcionarios");
  //   funcionarios.child("001").remove();
  //   //Salvar e alterar nós
  //   // database.ref("pontuacao").remove();
  // }

  // listarDados() {
  //   var pontuacao = firebase.database().ref("pontuacao");
  //   pontuacao.on('value', (snapshot) => {
  //     alert(snapshot.val());
  //   });
  // }

  // cadastrarUsuario() {
  //   var email = "vital_junior_@hotmail.com";
  //   var senha = "123456";

  //   var usuario = firebase.auth();
  //   usuario.createUserWithEmailAndPassword(email, senha)
  //     .catch(
  //       (error) => {
  //         // alert(error.code)
  //         // alert(error.message);
  //       }
  //     );
  // }

  // verificarUsuarioLogado() {
  //   var usuario = firebase.auth();

  //   usuario.onAuthStateChanged(
  //     (usuarioAtual) => {
  //       if (usuarioAtual) {
  //         alert("Usuário está logado!");
  //       } else {
  //         alert("Usuário não está logado!");
  //       }
  //     }
  //   );

  //   // var usuarioAtual = usuario.currentUser;

  //   // if (usuarioAtual) {
  //   //   alert("Usuário está logado!");
  //   // } else {
  //   //   alert("Usuário não está logado!");
  //   // }
  // }

  // logarUsuario(){
  //   var usuario = firebase.auth();

  //   var email = "vital_junior_@hotmail.com";
  //   var senha = "123456";

  //   usuario.signInWithEmailAndPassword(
  //     email,senha
  //   ).catch(
  //     (error) => {
  //       // alert(error.code)
  //       alert(error.message);
  //     }
  //   );

  // }

  // deslogarUsuario(){
  //   var usuario = firebase.auth();
  //   usuario.signOut();
  // }



  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Rotas />
      </Provider>
    );
  }


}

export default App;
