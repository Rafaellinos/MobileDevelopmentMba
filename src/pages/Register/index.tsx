import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import { Button, FlatList, Text,
    View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView} from 'react-native';

import styles from './style';

export default function RegisterPage({ navigation }: any) {
    const [ login, setLogin ] = useState('');
    const [ password, setpassword ] = useState('');
    const [ cpassword, setCPassword] = useState('');
    const [ address, setAddress] = useState('');
    const [ age, setAge] = useState<Number>();
    const [ name, setName] = useState('');

    async function signUp() {
        console.log(`registering...`);
        if (password !== cpassword) {
            ErrorSignUp("Your password doesn't match, chack try again!");
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
            navigation.navigate('Product');
        } else {
            let responseText = await response.text();
            console.log(`error: ${responseText}`)
            ErrorSignUp(responseText);
        }
    }

    async function ErrorConvertToNumber(error: string) {
        Alert.alert(
            "Error to convert Age to number!",
            `Error: ${error}`,
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
            "Error!!!",
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
        <ScrollView>
            <KeyboardAvoidingView contentContainerStyle={styles.container} behavior="padding" enabled>
                <View style={styles.mainView}>
                    <StatusBar style="auto" />
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Name."
                            placeholderTextColor="#003f5c"
                            onChangeText={n => setName(n)}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            keyboardType='numeric'
                            placeholder="Age."
                            maxLength={10}
                            placeholderTextColor="#003f5c"
                            onChangeText={i => formatToNumber(i, setAge, ErrorConvertToNumber)}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Address."
                            placeholderTextColor="#003f5c"
                            onChangeText={a => setAddress(a)}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Email."
                            placeholderTextColor="#003f5c"
                            onChangeText={log => setLogin(log)}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password."
                            placeholderTextColor="#003f5c"
                            onChangeText={pass => setpassword(pass)}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Confirm Password."
                            placeholderTextColor="#003f5c"
                            onChangeText={pass => setCPassword(pass)}
                        />
                    </View>

                    <TouchableOpacity style={styles.loginBtn} onPress={signUp}>
                        <Text>SignUp</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
        
    )
}
