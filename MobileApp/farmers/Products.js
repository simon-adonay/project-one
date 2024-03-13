import React from 'react'
import { Text, View, ScrollView, ActivityIndicator, FlatList, AsyncStorage, SafeAreaView } from 'react-native';
import axios from 'axios';
import farmerList from './farmersList';
import ProductItem from './ProductItem';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';
import { lessThan } from 'react-native-reanimated';
import { TabRouter } from '@react-navigation/native';

const Products = ({ route: { params }, navigation: { navigate } }) => {
    // const [data, setData] = React.useState('')
    let { farmer } = params;
    // let { products } = params
    console.log(farmer, 'farmer')
    console.log(farmer.item.products)
    let farmerId = farmer.item._id
    console.log(farmerId)
    let products = farmer.item.products
    console.log(products)
    products = products.filter(prod => prod.quantity > 0)
    let customer;
    let customerId
    let cart;


    const currentCustomer = async () => {
        customer = await AsyncStorage.getItem("customer")
        customer = JSON.parse(customer)
        if (customer) {
            customerId = customer._id
            console.log(customerId)
        }

    }

    currentCustomer()

    const onAddToCartHandler = (prodId, name, quantity, price) => {
        let product = { prodId, name, quantity, price, farmerId }
        console.log(product)
        axios.patch(`http://localhost:5000/customer/${customerId}/${prodId}`, product ).then(res => {

            alert('product added to cart')
        }

        )
    }
    const getCart = () => {
        axios.get(`http://localhost:5000/customer/cart/${customerId}`)
            .then(res => {
                navigate('TO_CART', {
                    cart: res.data,
                    farmerId: farmerId
                })

            }

            )
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {products.map(product => (
                    <Card key={product._id}>
                        <Card.Title title={product.name} subtitle="Card Subtitle" />
                        <Card.Content>
                            <Title>price-per-lb: $ {product.price} </Title>
                            <Title>lbs</Title>
                            <Paragraph>Max amount to Order: {product.quantity} lbs</Paragraph>
                        </Card.Content>
                        <Card.Cover source={{ uri: `http://localhost:5000/files/${product.imageUrl}` }} />
                        <Card.Actions >
                            <Button onPress={() => onAddToCartHandler(product._id, product.name, product.quantity, product.price, farmerId)}>Add To Cart</Button>

                        </Card.Actions>
                    </Card>
                ))}
                <Button onPress={() => {
                    getCart()

                }} >Detail</Button>
            </ScrollView>
        </SafeAreaView >)
}

export default Products;
