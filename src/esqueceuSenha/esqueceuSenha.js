import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native'

const style = StyleSheet.create({
    backGround: {
        backgroundColor: '#5458af',
        flex: 1,
    },
    txtTitulo: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: "bold",
    },
    boxTitulo: {
        alignItems: 'center',
        paddingTop: 10,
        marginHorizontal: 10
    },

    boxInput: {
        // alignItems:'center'
        paddingTop: 20,
    },
    txtInput: {
        backgroundColor: '#FFF',
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        elevation: 5,
        paddingLeft: 30
    },

    boxButtonEnviar: {
        marginTop: 30,
        backgroundColor: '#F2F2F2',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 80,
        borderRadius: 50,
        elevation: 5
    },
    txtButtonEnviar: {
        color: '#5458af',
        fontWeight: 'bold',
        fontSize: 15
    }

})

class EsqueceuSenha extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={style.backGround}>

                <View style={style.boxTitulo}>
                    <Text style={style.txtTitulo}>Informe seu e-mail, para que possamos enviar uma nova senha.</Text>
                </View>

                <View style={style.boxInput}>
                    <TextInput
                        style={style.txtInput}
                        placeholder="E-mail"
                    />
                </View>

                <TouchableHighlight
                    onPress={() => alert('teste')}
                    underlayColor={'#5458af'}>
                    <View style={style.boxButtonEnviar}>
                        <Text style={style.txtButtonEnviar}>Enviar</Text>
                    </View>
                </TouchableHighlight>


            </View>
        )
    }
}

export default EsqueceuSenha;