import React, { useState } from 'react';
import { Button, FlatList, Text,
    View, TextInput, StyleSheet, Dimensions, Alert} from 'react-native';

import LoginPage from '../Login';

export default function RegisterPage({ navigation }: any) {
    const [ login, setLogin ] = useState('');
    const [ password, setpassword ] = useState('');
    const [ cpassword, setCPassword] = useState('');
    const [ address, setAddress] = useState('');
    const [ age, setAge] = useState<Number>();
    const [ name, setName] = useState('');

    async function signUp() {
        console.log(`Cadastrando...`);
        if (password !== cpassword) {
            ErrorSignUp("Senhas precisam ser iguais!");
            return;
        }
        const response = await fetch(
            'https://example-ecommerce.herokuapp.com/user/customer/add',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    address: address,
                    age: age,
                    name: name,
                    email: login,
                    userPassword: password,
                })

            }
        );
        if (response.ok) {
            let token: string = await response.text();
            console.log(`Logado: ${token}`);
        } else {
            console.log(`erro: ${await response.text()}`)
            ErrorSignUp(response.statusText);
        }
    }

    async function ErrorConvertToNumber(error: string) {
        Alert.alert(
            "Erro para converter idade!",
            `Erro: ${error}`,
            [
                {
                    text: "Ok",
                    onPress: () => console.log("Ok pressed"),
                }
            ]
        )
    }

    async function ErrorSignUp(error: string) {
        Alert.alert(
            "Erro para se cadastrar!",
            `Erro: ${error}`,
            [
                {
                    text: "Ok",
                    onPress: () => console.log("Ok pressed"),
                }
            ]
        )
    }

    async function formatToNumber(StringToNumber: string, setFunction: CallableFunction, errorHandler: CallableFunction) {
        try {
            setFunction(Number(StringToNumber.replace(/[^0-9]/g, '')));
        } catch(err) {
            errorHandler(err);
        }
        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} onChangeText={n => setName(n)}/>
            <Text style={styles.label}>Idade</Text>
            <TextInput style={styles.input} 
                keyboardType='numeric'
                maxLength={10}
                onChangeText={i => formatToNumber(i, setAge, ErrorConvertToNumber)}/>
            <Text style={styles.label}>Endereço</Text>
            <TextInput style={styles.input} onChangeText={a => setAddress(a)}/>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} onChangeText={log => setLogin(log)}/>
            <Text style={styles.label}>Senha</Text>
            <TextInput 
                secureTextEntry={true}
                style={styles.input} onChangeText={pass => setpassword(pass)} />
            <Text style={styles.label}>Confirme sua Senha</Text>
            <TextInput 
                secureTextEntry={true}
                style={styles.input} onChangeText={pass => setCPassword(pass)} />
            <Button
                color="#f194ff"
                title="Cadastrar"
                onPress={signUp}>
                <Text>Entrar</Text>
            </Button>
            <Button
                color="#f194ff"
                title="Logar"
                onPress={() => navigation.navigate('Contatos')}>
                <Text>Login</Text>
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