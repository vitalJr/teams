import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    StatusBar,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
console.ignoredYellowBox = ['Warning: ReactNative.createElement'];


const estilo = StyleSheet.create({
    topo: {
        backgroundColor: '#5458af',
        padding: 10,
        height: 70,
        elevation: 5,
        justifyContent: "space-between",
        alignItems: 'center',
        flexDirection: 'row'
    },
    texto: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 20,
        marginLeft: 15
    },
    logo: {
        flexDirection: "row",
        alignItems: 'center'
    },
    options: {
        marginRight: 20,
    }
});

class Topo extends Component {

    constructor(props) {
        super(props);

        this.state = { logo: this.props.logo };
    }

    render() {
        return (
            <View style={estilo.topo}>
                <View style={estilo.logo} >
                    <StatusBar backgroundColor='#5458af' />
                    <Image source={require('../img/teams.png')} style={{ width: 50, height: 50 }} />
                    <Text style={estilo.texto}>Teams</Text>
                    {/* <Image source={ {uri:'https://reactjs.org/logo-og.png'} }
            style={{width:300,height:300}} /> */}
                </View>

                <View style={estilo.options}>
                    <TouchableHighlight
                        onPress={() => { Actions.adicionarcontato(); }}
                        underlayColor={'#5458af'}>
                        <Image source={require('../img/add.png')} style={{ width: 30, height: 30 }} />
                    </TouchableHighlight>
                </View>
            </View>

        );
    }
}

export default Topo;