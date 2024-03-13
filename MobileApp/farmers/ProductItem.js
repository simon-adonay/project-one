import React from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';

import {
    View,
    Text,
    Image,
    StyleSheet,

    TouchableOpacity,
    TouchableNativeFeedback,
    Platform

} from 'react-native';
import Products from './Products'

const ProductItem = (props) => {


    return (

        <TouchableOpacity onPress={() => props.onViewDetail}>
            <Card>
                <Card.Title title={props.name} subtitle="Card Subtitle" />
                <Card.Content>
                    <Title>{props.quantity} </Title>
                    <Paragraph>{props.description}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: `http://localhost:5000/files/${props.image}` }} />
                <Card.Actions>
                    <Button onPress={() => props.onViewDetail}>Detail</Button>
                    {/* <Button onPress={() => props.onAddToCart} >To Cart</Button> */}
                </Card.Actions>
            </Card>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10
    }
})

export default ProductItem;


