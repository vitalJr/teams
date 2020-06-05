import React, { Component } from 'react';
import { View, Text,StyleSheet, Image } from 'react-native';


const style = StyleSheet.create({
    fundo: {
        backgroundColor: '#e5eff1',
        flex: 1,
        justifyContent: 'center'
    },
})

class LoadingCadastro extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={style.fundo}>
                <Image source={require('../../img/loading-login.gif')}
                    style={{ marginBottom: 15, alignSelf: 'center' }} />
                <Text style={{alignSelf:'center',fontSize:20,color:'#5458af'}}>Carregando...</Text>
            </View>
        )
    }


}

export default LoadingCadastro;