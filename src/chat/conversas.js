import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { conversasUsuarioFetch } from '../actions/AppAction';

const style = StyleSheet.create({
    conversa: {
        borderColor: '#5458af',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30
    },
    backGroundSemConversa: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 100
    },
    txtSemConversa: {
        color: '#5458af',
        fontSize: 18,
        marginTop: 15,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        // paddingTop: 22
    },
    msg: {
        fontSize: 15,
        color: '#bfb8a9',
        fontWeight: 'bold'
    },
    msgNome: {
        fontSize: 18,
        color: '#000',
        // fontWeight:'bold' 
    },
    boxItem: {
        borderColor: '#5458af',
        borderWidth: 1,
        padding: 15,
        margin: 2,
    },
    boxBtnAceitarRecusar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    btnAceitarRecusar: {
        borderWidth: 1,
        borderColor: '#5458af',
        borderRadius: 10,
        padding: 6,
        marginHorizontal: 4,
        backgroundColor: '#5458af',
        color: '#F2F2F2',
        fontWeight: 'bold'

    },
    boxPerfil: {
        flexDirection: 'row'
    }
})

class Conversa extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.conversasUsuarioFetch();
    }

    renderConversas(conversas) {
        // alert('Entrou Aqui 1');
        if (conversas.length > 0) {
            return (
                <View style={style.container}>
                    <FlatList
                        data={conversas}
                        renderItem={({ item }) =>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#DDDDDD"
                                onPress={() => Actions.conversa({
                                    title: item.nome,
                                    contatoNome: item.nome,
                                    contatoEmail: item.email
                                })}>
                                <View style={style.boxItem}>
                                    <View style={style.boxPerfil}>
                                        <Image source={require('../../img/usuario.png')}
                                            style={{ width: 70, height: 70 }} />
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={style.msgNome}>{item.nome}</Text>
                                            <Text style={style.msg}>{item.mensagem}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        }
                    />
                </View>
            );
        }


        return (
            <View >
                <View style={style.backGroundSemConversa}>
                    <Image source={require('../../img/teamsBV.png')}
                        style={{ width: 150, height: 150 }} />
                    <Text style={style.txtSemConversa}>Nenhuma conversa iniciada</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            this.renderConversas(this.props.conversas)
        )
    }

}

const mapStateToProps = state => {
    const conversas = _.map(state.ListaConversasReducer, (val, uid) => {
        return { ...val, uid }
    })
    return ({
        conversas: conversas
    })
}

export default connect(mapStateToProps, { conversasUsuarioFetch })(Conversa);