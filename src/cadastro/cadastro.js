import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import {
    modificaEmail,
    modificaSenha,
    modificaNome,
    cadastraUsuario
} from '../actions/AutenticacaoActions';


const style = StyleSheet.create({
    backGround: {
        backgroundColor: '#5458af',
        flex: 1,
        // alignItems: 'center'
    },
    txtTitulo: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: "bold",
    },
    txtInput: {
        backgroundColor: '#FFF',
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        elevation: 5,
        paddingLeft: 30
    },
    boxTitulo: {
        alignItems: 'center',
        paddingTop: 10
    },
    boxInput: {
        // alignItems:'center'
        paddingTop: 20,
    },
    boxButtonCadastrar: {
        marginTop: 30,
        backgroundColor: '#F2F2F2',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 80,
        borderRadius: 50,
        elevation: 5
    },
    txtButtonCadastrar: {
        color: '#5458af',
        fontWeight: 'bold',
        fontSize: 15
    }

})

class Cadastro extends Component {

    constructor(props) {
        super(props);
    }

    _cadastraUsuario() {

        var nome = this.props.nome;
        var email = this.props.email;
        var senha = this.props.senha;

        this.props.cadastraUsuario({ nome, email, senha });
    }

    renderBtnCadastrar() {

        if (this.props.loadingCadastro) {
            return (
                <ActivityIndicator size="large"/>
            )
        }

        return (
            <TouchableHighlight
                onPress={() => this._cadastraUsuario()}
                underlayColor={'#5458af'}>
                <View style={style.boxButtonCadastrar}>
                    <Text style={style.txtButtonCadastrar}>Cadastrar</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {

        return (
            <View style={style.backGround}>

                <View style={style.boxTitulo}>
                    <Text style={style.txtTitulo}>Tenha conversas incríveis!</Text>
                </View>


                <View style={style.boxInput}>
                    <TextInput
                        style={style.txtInput}
                        value={this.props.nome}
                        onChangeText={nome => { this.props.modificaNome(nome) }}
                        placeholder="Usuário"
                    />

                    <TextInput
                        style={style.txtInput}
                        value={this.props.email}
                        onChangeText={email => { this.props.modificaEmail(email) }}
                        placeholder="E-mail"
                    />

                    <TextInput
                        style={style.txtInput}
                        secureTextEntry={true}
                        onChangeText={senha => { this.props.modificaSenha(senha) }}
                        value={this.props.senha}
                        placeholder="Senha"
                    />

                </View>

                <View style={{
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginVertical: 10
                }}>
                    <Text style={{ color: '#ff0000', fontSize: 18 }}>{this.props.erroCadastro}</Text>
                </View>

                {this.renderBtnCadastrar()}



            </View>
        );
    }
}

const mapStateToProps = state => ({
    nome: state.AutenticacaoReducer.nome,
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    erroCadastro: state.AutenticacaoReducer.erroCadastro,
    loadingCadastro: state.AutenticacaoReducer.loadingCadastro
})

export default connect(mapStateToProps, {
    modificaEmail,
    modificaSenha,
    modificaNome,
    cadastraUsuario
})(Cadastro);