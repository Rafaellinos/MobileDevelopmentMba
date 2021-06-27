import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import { Image, TouchableOpacity, Text, View, TextInput, Alert} from 'react-native';

import styles from './style';

export default function LoginPage({ navigation }: any) {

    const [ login, setLogin ] = useState('');
    const [ password, setPassword ] = useState('');

    function alertErrorLogin(error: string) {
        console.log(error);
        Alert.alert(
            "Error for login!",
            `Details: ${error}`,
            [
                {
                    text: "Ok",
                    onPress: () => console.log("Ok pressed"),
                }
            ]
        )
    }

    async function appLogin() {
        console.log(`loggging in ... ${login}:${password}`);
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
            console.log(`login success: ${token}`);
            navigation.navigate('Product');
        } else {
            alertErrorLogin((await response.text()).toString());
        }
    }

    return (
        <View style={styles.container}>

            <Image style={styles.image} source={require("../../../assets/ecommerce-logo.png")} />

            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                style={styles.TextInput}
                placeholder="Email."
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setLogin(email)}
                />
            </View>
 
            <View style={styles.inputView}>
                <TextInput
                style={styles.TextInput}
                placeholder="Password."
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(p) => setPassword(p)}
                />
            </View>
        
            <TouchableOpacity>
                <Text style={styles.forgot_button} onPress={() => navigation.navigate('Register')}>Register</Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.loginBtn} onPress={appLogin}>
                <Text>SignIn</Text>
            </TouchableOpacity>
        </View>
    )
}
