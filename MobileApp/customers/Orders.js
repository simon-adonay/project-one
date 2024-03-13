import React from 'react'
import {  Button, StyleSheet , SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { List } from 'react-native-paper';

const Orders = ({ navigation: { navigate } }) => {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const [data, setData] = React.useState([])
    let customerId;

    React.useEffect(() => {

        const OrderList = async () => {
            try {
                let customer = await AsyncStorage.getItem("customer")
                customer = JSON.parse(customer)
                if (customer) {
                    console.log(customer)
                    console.log(customer.email)
                    customerId = customer._id
                    console.log(customerId)
                }
                console.log(customerId)

                let customerOrders = await axios.get(`http://localhost:5000/orders/customer/${customerId}`)
                customerOrders = customerOrders.data
                setData(customerOrders)
                console.log(customerOrders)

            } catch (err) {
                console.log(err)
            }
        }
        OrderList()
    }, [])

    const goToPayment = () => {
        navigate('PAY')
    }
    let orderbyStatusHandler = (a, b) => {
        let sortedbyStatus = [...data].sort((a, b) => {
            if (a.status < b.status) return -1;
            if (a.status > b.status) return 1;
            return 0;
        })
        setData(sortedbyStatus)
    }

    let orderbyDateHandler = (a, b) => {
        let sortedbyDate = [...data].sort((a, b) => {
            if (a.time < b.time) return -1;
            if (a.time > b.time) return 1;
            return 0;
        })
        setData(sortedbyDate)

    }

    let pendingHandler = () => {
        console.log(data, 'before fitlter')
        let byPending = data.filter(item => {
            return item.status === "pending"
        })

        setData(byPending)
    }

    let readyHandler = () => {
        console.log(data, 'before fitlter')
        let byReady = data.filter(item => {
            return item.status === "ready"
        })

        setData(byReady)
    }

    let completeHandler = () => {
        console.log(data, 'before fitlter')
        let byComplete = data.filter(item => {
            return item.status === "complete"
        })

        setData(byComplete)
    }


    return (
        <ScrollView>
            <Button title="Status-Pending" onPress={() => { pendingHandler() }} />
            <Button title="Status-Ready" onPress={() => { readyHandler() }} />
            <Button title="Status-Completed" onPress={() => { completeHandler() }} />

            <Button title="sortbyStatus" onPress={() => { orderbyStatusHandler() }} />
            <Button title="sortbyDate" onPress={() => { orderbyDateHandler() }} />
            {data.map(value => (

                <List.Section
                    key={value._id}
                    title={value.status} >
                    <Button title='Pay' onPress={() => navigate('PAY', { product: value })} />
                    <List.Section
                        key={value._id}
                        title={value.totalPrice}></List.Section>
                    <List.Accordion
                        id={value.totalPrice}
                        title={value.time}
                        left={props => <List.Icon {...props} icon="cart" />}>
                        {value.product.map((prod, index) => (
                            <List.Item
                                key={index}
                                title={prod.name}
                            />
                        ))}
                    </List.Accordion>
                </List.Section>
            ))

            }

        </ScrollView >

    )
}

export default Orders
