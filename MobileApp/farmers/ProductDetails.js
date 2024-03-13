import React from 'react'
import { ScrollView, View, Text, StyleSheet, Button, Image } from 'react-native'
import Products from './Products';

const ProductDetails = ({ route: { params } }, { navigation }) => {
    
    const { productId } = params
    

    console.log(productId)
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.actions}>
                <Button color={Colors.primary} title='Add to Cart'
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct))
                    }} />
            </View>
            <Text style={styles.price} >${selectedProduct.price.toFixed(2)} </Text>
            <Text style={styles.description} >{selectedProduct.description}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        margin: 20
    },

    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    }
})

export default ProductDetails;