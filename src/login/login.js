import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ImageBackground,
    StatusBar,
    ActivityIndicator
} from 'react-native';

import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import {
    modificaEmail,
    modificaSenha,
    autenticarUsuario
} from '../actions/AutenticacaoActions';

const style = StyleSheet.create({
    fundo: {
        backgroundColor: '#5458af',
        flex: 1,
        justifyContent: 'center'
    },
    loginBox: {
        backgroundColor: '#F2F2F2',
        height: 300,
        marginHorizontal: 30,
        elevation: 5,
        borderRadius: 50,
    },
    register: {
        alignSelf: 'center',
    },
    registerText: {
        color: '#FFF',
        fontWeight: '800'
    },

    esqueceuSenha: {
        color: '#FFF',
        fontWeight: '800',
        marginTop: 5
    },
    textInput: {
        height: 60,
        fontSize: 15,
    },
    boxTextInput: {
        borderColor: '#5458af',
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 20,
        paddingHorizontal: 10
    },
    btEntrar: {
        backgroundColor: '#5458af',
        height: 40,
        marginHorizontal: 80,
        alignItems: 'center',
        borderRadius: 20,
        justifyContent: 'center'
    },
    txtEntrar: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600'
    }
});




class Login extends Component {

    constructor(props) {
        super(props)
        console.log(props);
        this.state = { usuario: '', senha: '' };
    }

    _autenticarUsuario() {
        var email = this.props.email;
        var senha = this.props.senha;
        this.props.autenticarUsuario(email, senha);
    }

    renderBtnAcessar() {

        if (this.props.loadingLogin) {
            return (
                <ActivityIndicator size="large"/>
            )
        }

        return (
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => this._autenticarUsuario()}
                style={style.btEntrar}>
                <Text
                    style={style.txtEntrar}>
                    Entrar
                            </Text>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={style.fundo}>
                <StatusBar backgroundColor='#5458af' />

                <View style={{
                    alignItems: 'center',
                    marginVertical: 10,
                    marginHorizontal: 10
                }} >
                    <Text style={{
                        color: '#ff0000',
                        fontSize: 18, fontWeight: 'bold'
                    }}>{this.props.erroAutenticarUsuario}</Text>
                </View>

                <View style={style.loginBox}>
                    <Image source={require('../../img/teams.png')}
                        style={{ width: 50, height: 50, marginTop: 15, marginBottom: 15, alignSelf: 'center' }} />

                    <View>
                        <View style={style.boxTextInput}>
                            <TextInput
                                style={style.textInput}
                                placeholder="E-mail ou Usuário"
                                onChangeText={email => { this.props.modificaEmail(email) }}
                                value={this.props.email}
                            />
                        </View>
                        <View style={style.boxTextInput}>
                            <TextInput
                                style={style.textInput}
                                placeholder="Senha"
                                secureTextEntry={true}
                                onChangeText={senha => { this.props.modificaSenha(senha) }}
                                value={this.props.senha}
                            />
                        </View>
                    </View>

                    {this.renderBtnAcessar()}


                </View>
                <TouchableOpacity
                    style={style.register}
                    onPress={Actions.cadastro}>
                    <Text style={style.registerText}>Ainda não tem uma conta? Registre-se</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={style.register}
                    onPress={Actions.esqueceusenha}>
                    <Text style={style.esqueceuSenha}>Esqueceu a senha?</Text>
                </TouchableOpacity>
            </View>
        );
    }


}

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroAutenticarUsuario: state.AutenticacaoReducer.erroAutenticarUsuario,
        loadingLogin: state.AutenticacaoReducer.loadingLogin
    }
)

export default connect(mapStateToProps, {
    modificaEmail,
    modificaSenha,
    autenticarUsuario
})(Login);