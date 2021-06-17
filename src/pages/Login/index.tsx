import React, { useState } from 'react';
import { Button, FlatList, Text, View, TextInput, StyleSheet, Dimensions} from 'react-native';

export default function LoginPage() {

    const [ login, setLogin ] = useState('');
    const [ password, setpassword ] = useState('');
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

    function teste() {
        console.log(login);
        console.log(password);
        console.log('Teste');
        let response = fetch(
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
        response
            .then(
                res => {
                    console.log(res.text());
                    console.log(res.status);
                    //res.json();
                    return res;
                }
            )
            .then(
                (res) => {
                    console.log(res);
                    if (res.status === 200) {
                        console.log("infeliz logou");
                    } else {
                        console.log("infeliz n logou");
                    }
                }
            )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} onChangeText={log => setLogin(log)}/>
            <Text style={styles.label}>Senha</Text>
            <TextInput style={styles.input} onChangeText={pass => setpassword(pass)} />

            <Button
                color="#f194ff"
                title="Logar"
                onPress={teste}>
                <Text>Entrar</Text>
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