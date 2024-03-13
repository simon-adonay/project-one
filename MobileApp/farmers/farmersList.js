import React from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Card } from 'react-native-elements'
import axios from 'axios';
import MyComponent from './cardlist'
import Farmer from './farmer';
import context from './context'
import { AsyncStorage } from 'react-native';

const FarmersList = ({ navigation: { navigate } }) => {
    const [data, setData] = React.useState([]);
    const { signOut } = React.useContext(context);

    const onProductHandler = async (farmerId) => {
        let currentuser = await AsyncStorage.getItem('customer');
        currentuser = JSON.parse(currentuser)
        let cart= currentuser.cart
        if (currentuser) {
            if (cart.Item.length>0) {
                if (cart.farmerId == farmerId) {
                    () => navigate('PRODUCTS',
                        { farmer: itemData })

                }
                else { alert('no ') }
            }
            else {
                () => navigate('PRODUCTS',
                    { farmer: itemData })

            }
        }
    }

    React.useEffect(() => {
        const farmers = async () => {
            try {
                let response = await axios.get('http://localhost:5000/customers')
                response = response.data.filter(item => {
                    return item.role !== 'superuser' && item.disabled === false

                })
                response = [...response].sort((a, b) => {
                    if (a.rating > b.rating) return -1;
                    if (a.rating < b.rating) return 1;
                    return 0;
                })

                console.log(response, 'sorted')
                setData(response)
                console.log(response)
                response = response.data

                console.log(data, 'xxxxxxxxxx')
                console.log(response)

            } catch (err) {
                console.log(err)

            }
        }
        farmers()
    }, [])


    return (<ScrollView>
        < Button title="signout" onPress={() => { signOut() }} />

        <FlatList

            data={data}
            keyExtractor={item => item._id}
            renderItem={itemData => <Farmer
                email={itemData.item.email}
                rating={itemData.item.rating}
                imageUrl={itemData.item.imageUrl}
                company={itemData.item.company}
                id={itemData.item._id}
                onProductList={() => onProductHandler(itemData.item._id)


                }
            />}
        />

    </ScrollView>)

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    farmer: {
        fontSize: 32,
    },
});

export default FarmersList;