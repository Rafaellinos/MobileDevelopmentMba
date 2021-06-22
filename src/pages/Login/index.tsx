import React, { useState } from 'react';
import { Button, FlatList, Text, View, TextInput, StyleSheet, Dimensions, Alert} from 'react-native';

import RegisterPage from '../register';

export default function LoginPage({ navigation }: any) {

    const [ login, setLogin ] = useState('');
    const [ password, setpassword ] = useState('');
    
    interface currentUser {
        login: string,
        token: string,
    }

    /*
    {
    "login": "rafael@email.com",
    "password": "123"
    }
    */
    // function handleChangeLogin(log: string) {
    //     login = log;
    // }
    
    // function handleChangePassword(pass: string) {
    //     password = pass;
    // }

    function alertErrorLogin(error: string) {
        Alert.alert(
            "Erro ao tentar efetuar login!",
            `Erro: ${error}`,
            [
                {
                    text: "Ok",
                    onPress: () => console.log("Ok pressed"),
                }
            ]
        )
    }

    async function appLogin() {
        console.log(`loggando ... ${login}:${password}`);
        const response = await fetch(
            'https://example-ecommerce.herokuapp.com/user/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    password: password,
                })
            }
        );
        if (response.ok) {
            let token: string = await response.text();
            console.log(`login com sucesso: ${token}`);
        } else {
            alertErrorLogin(response.statusText);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} onChangeText={log => setLogin(log)}/>
            <Text style={styles.label}>Senha</Text>
            <TextInput 
                secureTextEntry={true}
                style={styles.input} onChangeText={pass => setpassword(pass)} />
            <Button
                color="#f194ff"
                title="Logar"
                onPress={appLogin}>
                <Text>Entrar</Text>
            </Button>
            <Button
                color="#f194ff"
                title="Cadastrar"
                onPress={() => navigation.navigate('Register')}>
                <Text>Cadastrar</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
    },
    input: {
        width: Dimensions.get('screen').width - 40,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 20,
        height: 50,
    },
    button: {
        marginVertical: 10,
    }
})