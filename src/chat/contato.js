import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import _ from 'lodash';
import { connect } from 'react-redux';
import { contatoUsuarioFetch } from '../actions/AppAction';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 22
    },
    item: {
        // padding: 10,
        fontSize: 18,
        // height: 44,
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

class Contato extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.contatoUsuarioFetch();
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.contatos}
                    renderItem={({ item }) =>
                        <TouchableHighlight
                            activeOpacity={0.6}
                            underlayColor="#DDDDDD"
                            onPress={() => Actions.conversa({
                                title: item.nome,
                                contatoNome: item.nome,
                                contatoEmail: item.email
                            })}>
                            <View style={styles.boxItem}>
                                <View style={styles.boxPerfil}>
                                    <Image source={require('../../img/usuario.png')}
                                        style={{ width: 70, height: 70 }} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={styles.item}>{item.nome}</Text>
                                        <Text style={styles.item}>{item.email}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
                    }
                />
            </View>
        )
    }

}

const mapStateToProps = state => {
    const contatos = _.map(state.ListaContatoReducer, (val, uid) => {
        return { ...val, uid }
    })
    return { contatos: contatos }
}

export default connect(mapStateToProps, { contatoUsuarioFetch })(Contato);