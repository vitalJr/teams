import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Image,
    ActivityIndicator
} from 'react-native';

import { modificaAdicionaContatoEmail, enviarPedidoContatoEmail } from '../actions/AppAction';

import { connect } from 'react-redux';

const style = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: '#5458af',
    },
    textInput: {
        height: 60,
        fontSize: 15,
    },
    boxTextInput: {
        borderColor: '#F2F2F2',
        backgroundColor: '#F2F2F2',
        marginTop: 50,
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 20,
        paddingHorizontal: 10
    },
    boxPesquisa: {
        flexDirection: 'row'
    },
    boxButton: {
        backgroundColor: '#F2F2F2'
    },
    btEntrar: {
        backgroundColor: '#F2F2F2',
        height: 40,
        marginHorizontal: 80,
        alignItems: 'center',
        borderRadius: 20,
        justifyContent: 'center'
    },
    txtEntrar: {
        color: '#5458af',
        fontSize: 15,
        fontWeight: 'bold'
    },
    gifCarregamento: {
        alignItems: 'center',
        marginTop: 15
    },
    txtGif: {
        color: "#FFF",
        fontWeight: 'bold',
        fontSize: 18
    },
    msgErro: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginHorizontal: 10
    }
})

class AdicionarContato extends Component {

    constructor(props) {
        super(props);
    }

    _enviarPedidoContato() {
        var email = this.props.adicionaContatoEmail;
        if (email) {
            this.props.enviarPedidoContatoEmail(email);
        }

    }

    _renderGif() {
        if (this.props.loadingEnviarPedido) {
            return (
                <View style={style.gifCarregamento}>
                    <Image source={require('../../img/enviando-pedido.gif')}
                        style={{ width: 100, height: 100, marginBottom: 5, alignSelf: 'center' }} />
                    <Text style={style.txtGif}>Aguarde enquanto seu pedido é enviado!</Text>

                </View>
            );
        }

        return (
            <View style={style.gifCarregamento}>
                <Text style={style.txtGif}>Envie um pedido para um amigo!</Text>
            </View>
        );
    }

    _renderButtonEnviarPedido() {

        if (this.props.loadingEnviarPedido) {
            return (
                <ActivityIndicator size="large" />
            )
        };

        return (
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => this._enviarPedidoContato()}
                style={style.btEntrar}>
                <Text
                    style={style.txtEntrar}>
                    Enviar pedido
                </Text>
            </TouchableHighlight>
        )
    }

    _renderMsg() {

        if (this.props.adicionarContatoSucesso) {
            return (
                <Text style={{
                    color: '#FFF',
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>
                    Pedido enviado com sucesso! Aguarde até o usuário aceitar.
                </Text>
            );
        }

        if (this.props.adicionarContatoErro) {
            return (
                <Text style={{
                    color: '#ff0000',
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>
                    Este usuário não está cadastrado na plataforma!
                </Text>
            );
        }

        if (this.props.adicionarContatoErroMesmoUsuario) {
            return (
                <Text style={{
                    color: '#ff0000',
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>
                    Não é possível enviar um pedido para sí mesmo. Desculpe
                </Text>
            );
        }

    }


    render() {
        return (
            <View style={style.fundo}>
                <View>
                    <View style={style.boxTextInput}>
                        <TextInput style={style.textInput}
                            placeholder="E-mail do Usuário"
                            onChangeText={(email) => this.props.modificaAdicionaContatoEmail(email)}
                            value={this.props.adicionaContatoEmail} />
                    </View>
                    {this._renderButtonEnviarPedido()}
                </View>

                {this._renderGif()}

                <View style={style.msgErro}>
                    {this._renderMsg()}
                </View>

            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        adicionaContatoEmail: state.AppReducer.adicionaContatoEmail,
        loadingEnviarPedido: state.AppReducer.loadingEnviarPedido,
        adicionarContatoErro: state.AppReducer.adicionarContatoErro,
        adicionarContatoSucesso: state.AppReducer.adicionarContatoSucesso,
        adicionarContatoErroMesmoUsuario: state.AppReducer.adicionarContatoErroMesmoUsuario
    }
)

export default connect(mapStateToProps,
    { modificaAdicionaContatoEmail, enviarPedidoContatoEmail })
    (AdicionarContato);