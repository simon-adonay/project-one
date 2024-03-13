import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Text, View, ScrollView, ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const Farmer = props => {
    const MyRating = {

    }
    return (
        <ScrollView>
            <TouchableOpacity onPress={() => props.onProductList}>
                <Card>
                    <Card.Title title={props.company} subtitle="Card Subtitle" />
                    <Card.Content>
                        <Title>{props.email} </Title>
                        <Paragraph>{props.rating}</Paragraph>
                        <Paragraph style={styles.stars}>
                            {[1, 2, 3, 4, 5].map(i => {
                                return (
                                    <View
                                        // onPress={() => ratingHandler(i)}
                                        style={styles.starButton}
                                        key={i}
                                    >
                                        <Icon name='star' size={20}
                                            color={i <= props.rating ? '#FFD54C' : '#CCCCCC'}

                                        />
                                    </View>

                                )
                            })}
                        </Paragraph>
                    </Card.Content>
                    {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                    <Card.Cover source={{ uri: `http://localhost:5000/files/${props.imageUrl}` }} />

                    <Card.Actions>
                        <Button onPress={props.onProductList}>Products</Button>
                        <Button>Detail</Button>
                    </Card.Actions>
                </Card>

            </TouchableOpacity>
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

export default Farmer;
