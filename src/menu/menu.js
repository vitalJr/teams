import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native'
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


const style = StyleSheet.create({
    fundo: {
        backgroundColor: '#5458af',
        padding: 10,
        height: 70,
        elevation: 5,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    btnSair: {
        backgroundColor: '#F2F2F2',
        padding: 20,
        borderRadius: 20,

    }
})

class Menu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={style.fundo}>
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#5458af"
                    onPress={() => {
                        firebase.auth().signOut().then(() => {
                            Actions.login();
                        })
                    }}>
                    {/* <Text style={style.btnSair}>Sair</Text> */}
                    <Image source={require('../../img/sair.png')}
                        style={{ width: 50, height: 50, borderRadius: 20 }} />
                </TouchableHighlight>

            </View>
        )
    }

}

export default Menu;