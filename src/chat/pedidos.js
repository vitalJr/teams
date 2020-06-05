import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight, Image } from 'react-native';
import _ from 'lodash';

import { pedidosUsuarioFetch, aceitarPedido, recusarPedido } from '../actions/AppAction';
import { connect } from 'react-redux';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 22
    },
    item: {
        // padding: 5,
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

class Pedidos extends Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.props.pedidosUsuarioFetch();
    }



    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.pedidos}
                    renderItem={({ item }) =>
                        <View style={styles.boxItem}>
                            <View style={styles.boxPerfil}>
                                <Image source={require('../../img/usuario.png')}
                                    style={{ width: 70, height: 70 }} />
                                <View style={{flexDirection:'column'}}>
                                    <Text style={styles.item}>{item.nome}</Text>
                                    <Text style={styles.item}>{item.email}</Text>
                                </View>
                            </View>
                            <View style={styles.boxBtnAceitarRecusar}>
                                <TouchableHighlight
                                    activeOpacity={0.6}
                                    underlayColor="#DDDDDD"
                                    onPress={() => this.props.aceitarPedido(item, item.uid)}>
                                    <Text style={styles.btnAceitarRecusar}>Aceitar</Text>
                                </TouchableHighlight >
                                <TouchableHighlight
                                    activeOpacity={0.6}
                                    underlayColor="#DDDDDD"
                                    onPress={() => this.props.recusarPedido(item.uid)}>
                                    <Text style={styles.btnAceitarRecusar}>Recusar</Text>
                                </TouchableHighlight>
                            </View>

                        </View>
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    const pedidos = _.map(state.ListaPedidoReducer, (val, uid) => {
        return { ...val, uid }
    })
    return { pedidos: pedidos }
}



export default connect(mapStateToProps, {
    pedidosUsuarioFetch,
    aceitarPedido,
    recusarPedido
})(Pedidos);