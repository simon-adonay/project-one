import React from 'react'
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const payment = ({ route: { params }, navigation: { navigate } }) => {
    const [review, setReview] = React.useState(0)
    const { product } = params
    console.log(product)
    const farmerId = product.farmerId
    console.log(farmerId)
    let ratingHandler = async (review) => {
        setReview({ rating: review })
        await axios.patch(`http://localhost:5000/order/${farmerId}`,
            { "rating": review }
        )
        navigate('FARMERS')

    }

    return (

        <ScrollView>
            <Text>Payment</Text>
            <View style={styles.stars}>
                {[1, 2, 3].map(i => {
                    return (
                        <TouchableOpacity
                            onPress={() => ratingHandler(i)}
                            style={styles.starButton}
                            key={i}
                        >
                            <Icon name='star' size={40}
                                color={i <= review.rating ? '#FFD54C' : '#CCCCCC'}
                            />
                            <Text>{i == 3 ? 'Excellent' : i == 2 ? 'good' : 'bad'}</Text>
                        </TouchableOpacity>
                    )
                })}

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    button: {
        paddingHorizontal: 10,
    },
    addReview: {
        fontSize: 25,
        color: '#444',
        textAlign: 'center',
        margin: 20,
    },
    input: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 3,
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
});


export default payment

