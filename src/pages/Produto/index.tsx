import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Button, FlatList, Text, View } from 'react-native';

import styles from './style';

export default function ProdutoPage({ navigation }: any) {

    const [ produtos, setProdutos ] = useState();

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button onPress={() => navigation.navigate('Home')} title="LogOut"/>
          ),
        });
      }, [navigation]);

    useEffect(() => {
        getProducts();
    }, []);


    async function getProducts() {
        let products = await fetch(
            "https://example-ecommerce.herokuapp.com/product/list",
            {
                method: 'GET'
            }
        );
        let result = await products.json();
        console.log(result);
        setProdutos(result);
    }
    

    return (
        <View style={styles.container}>
            <FlatList
                data={produtos}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.productTitle}>{item.name}</Text>
                        <Text>Fabricante: {item.factory.name}</Text>
                        <View style={styles.Section}>
                            <Text>Preço: </Text>
                            <Text style={styles.price}>
                                R$ {item.price.toFixed(2).replace('.', ',')}
                            </Text>
                        </View>
                        <View style={styles.Section}>
                            <Text>Quantidade em estoque: </Text>
                                <Text style={styles.price}>
                                    {item.amount}
                                </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}
