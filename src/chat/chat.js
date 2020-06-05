import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, BackHandler } from 'react-native';
import { Container,Header, Tab, Tabs } from 'native-base';



import Conversa from './conversas';
import Contato from './contato';
import Pedidos from './pedidos';
import Topo from '../../topo/topo';
import Menu from '../menu/menu';

console.ignoredYellowBox = ['Warning: ReactNative.createElement'];


const style = StyleSheet.create({
    fundo: {
        backgroundColor: '#F2F2F2',
        flex: 1
    },
    topo: {
        backgroundColor: '#5458af',
        elevation: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    texto: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 20
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

class Chat extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount = () => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
    }

    render() {
        return (
            <View style={style.fundo}>
                <Topo></Topo>
                <Container>
                    <Tabs initialPage={0} >
                        <Tab heading="Conversas">
                            <View style={[style.container, { backgroundColor: '#F2F2F2' }]}>
                                <Conversa></Conversa>
                            </View>
                        </Tab>
                        <Tab heading="Contato">
                            <View style={[style.container, { backgroundColor: '#F2F2F2' }]}>
                                <Contato></Contato>
                            </View>
                        </Tab>
                        <Tab heading="Pedidos">
                            <View style={[style.container, { backgroundColor: '#F2F2F2' }]}>
                                <Pedidos></Pedidos>
                            </View>
                        </Tab>
                    </Tabs>
                </Container>
                <Menu></Menu>
            </View>
        )
    }


}

export default Chat;