import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import context from './farmers/context';
import { Appbar } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import signin from './users/signin'
import signup from './users/signup'
const Tab = createMaterialBottomTabNavigator();


const HOME = ({ navigation: { navigate } }) => {

    const { signIn } = React.useContext(context)

    return (
        <View style={styles.container}>
        
            <Tab.Navigator>
                <Tab.Screen name="SIGN_UP" component={signup} />
                <Tab.Screen name="SIGN_IN" component={signin} />
            </Tab.Navigator>
        </View >

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 0,
    },
    profilePicBox: {
        flex: 2,
    },
    image: {
        height: 350
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 26,
    },
    blue: {
        backgroundColor: 'powderblue',
    },
    purple: {
        backgroundColor: 'violet'
    },
    pink: {
        backgroundColor: 'pink'
    }
});
export default HOME;