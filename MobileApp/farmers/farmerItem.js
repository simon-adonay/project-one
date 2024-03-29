import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform

} from 'react-native'

const FarmerItem = props => {

    return (
        <TouchableOpacity onPress={props.onViewDetail}>
            <View style={styles.product}>
                <View style={styles.imageContainer} >
                    <Image style={styles.image} source={{ uri: props.image }} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title} >{props.title}</Text>
                    <Text style={styles.price}>{props.price.toFixed(2)} </Text>
                </View>
                <View style={styles.actions}>
                    <Button title='View Details' onPress={props.onViewDetail} />
                    <Button title='To Cart' onPress={props.onAddToCart} />
                </View>
            </View >
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


