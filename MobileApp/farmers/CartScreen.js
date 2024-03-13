import React, { useState } from 'react'
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Menu } from 'react-native-paper';
// import { Colors } from '../../constants/Colors'
import { PricingCard, ListItem } from 'react-native-elements';
import { Card, Title, Paragraph } from 'react-native-paper';
import context from './context';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { NavigationHelpersContext } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CartScreen = ({ route: { params }, navigation: { navigate } }) => {
    const { cart } = params
    const { farmerId } = params
    console.log(cart)
    console.log(cart._id, 'customerId')
    let customerId = cart._id
    console.log(customerId)
    console.log(farmerId, 'farmerId')
    let inventory


    let onUpdateInventory = () => {
        console.log(bought)

    }

    const getCustomer = async () => {
        let customer = await AsyncStorage.getItem("customer")
        customer = JSON.parse(customer)
        if (customer) {
            console.log(customer.email)
            console.log(customer.password)
        }

    }

    getCustomer()
    // console.log(customer,)

    const cartClearingHandler = () => {
        axios.put(`http://localhost:5000/customer/cart/${customerId}`)
    }

    const onOrderHandler = () => {

        axios.post('http://localhost:5000/order',
            {
                _id: customerId,
                farmerId: farmerId
            }
        ).then(
            res => {
                console.log(res.data)
                inventory = res.data.product
                console.log(inventory)
                inventory.map(prod => {
                    console.log(farmerId)
                    axios.patch(`http://localhost:5000/farmers/${farmerId}/${prod.prod_id}`,
                        { "quantity": prod.quantity }
                    ).then(res => {
                        console.log(res.data)
                    })
                })



                console.log(res.data.product)
                cartClearingHandler()
                navigate('ORDER_LIST')
            })
        console.log(inventory)
        console.log(farmerId)

    }

    return (
        <SafeAreaView style={styles.cart}>
            {/* <View style={styles.wrapper} > */}

            {cart.cart.Item.map(item => (
                <PricingCard style={styles.containerStyle}
                    key={item._id}
                    color="#4f9deb"
                    title={<Text style={styles.totalSummary}>Product:{item.name}</Text>}
                    price={<Text style={styles.totalSummary}>Quantity Ordered: {item.quantity} subTotal:${item.subTotal}</Text>}
                    button={{ title: 'Remove', icon: 'delete' }}
                    onButtonPress={() => { console.log('removed') }}

                />

            ))}

            <Text style={styles.totalSummary}>
                Total: <Text style={styles.total}>${cart.cart.totalPrice}</Text></Text>
            <Button title="Order Now" onPress={() => onOrderHandler()} />
            {/* </View> */}

        </SafeAreaView >

    )
}
const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'column',
    },
    cart: {
        margin: 20
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
        marginBottom: 20,
        padding: 10,
        // shadowColor: 'black',
        // shadowOpacity: '0.27',
        // shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    totalSummary: {
        fontSize: 18,

    },
    total: {

    },
    rating: {
        fontSize: 20,
        color: 'grey',
        textAlign: 'center',
        marginVertical: 40,
    },
    stars: {
        marginBottom: 80,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    starButton: {
        padding: 5,
    },
    submitButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#0066cc',
        borderRadius: 4,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    submitButtonText: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
    },

})
export default CartScreen
