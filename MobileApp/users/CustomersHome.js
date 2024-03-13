import React from 'react'
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Orders from '../customers/Orders';
import Farmers from '../farmers/farmersList';
import { AsyncStorage } from 'react-native';
import authContext from '../farmers/context';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const CustomersHome = () => {
    const { id } = React.useContext(authContext);


    const getCustomer = async () => {
        let customer = await AsyncStorage.getItem("customer")
        customer = JSON.parse(customer)
        if (customer) {
            console.log(customer)
            console.log(customer.email)
            console.log(customer.password)
        }
    }
    return (
        <Tab.Navigator>
            <Tab.Screen name="FARMERS" component={Farmers} />
            <Tab.Screen name="ORDER_LIST" component={Orders} />
        </Tab.Navigator>
    )
}

export default CustomersHome





