import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import signin from './users/signin';
import signup from './users/signup';
import Farmers from './farmers/farmersList';
import Home from './HOME';
import Products from './farmers/Products'
import AuthContext from './farmers/context'
import MyComponent from './farmers/cardlist';
import ProductDetails from './farmers/ProductDetails'
import CartScreen from './farmers/CartScreen';
import Orders from './customers/Orders';
import CustomersHome from './users/CustomersHome';
import Payment from './customers/payment'
const Stack = createStackNavigator();

export default function App() {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        id: action.id,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
                // case 'SIGN-UP':
                //     return {
                //         ...prevState,
                //         isSignout: true,
                //         userToken: null,
                //     };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;
            try {
                /**avoiding re login  */
                userToken = await AsyncStorage.getItem('userToken');
                if (userToken) dispatch({ type: 'RESTORE_TOKEN', token: userToken });
            }
            catch (err) {
                console.log(err)
            }
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                console.log(data, "dataaaaaaa")
                console.log(data.data.Authorization, 'data.data.token')
                console.log(data.data.customer, 'customer')
                await AsyncStorage.setItem('userToken', JSON.stringify(data.data.Authorization));
                await AsyncStorage.setItem('customer', JSON.stringify(data.data.customer));

                let userToken = await AsyncStorage.getItem('userToken');
                if (userToken) {
                    dispatch({ type: 'SIGN_IN', token: userToken, role: data.data.customer.role, id: data.data.customer._id, cart: data.data.customer.cart });
                }
            },
            /** ACTION LOG-OUT   */
            signOut: async () => {
                await AsyncStorage.clear()
                console.log(state.userToken, "dddd");
                // make sure we have cleared the 
                await dispatch({ type: 'SIGN_OUT' })
            },



            signUp: async (data) => {

                dispatch({ type: 'SIGN-UP', token: userToken });

            },
        }),
        []
    );

    console.log(state.id)
    const id = state.id
    console.log(state.userToken, 'token in app')

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerStyle: {
                        backgroundColor: '#009387',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
                >
                    {!state.userToken ? (
                        <React.Fragment>
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="SIGN_UP" component={signup} />
                            <Stack.Screen name="SIGN_IN" component={signin} />
                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                <Stack.Screen name="CUSTOMER" component={CustomersHome} />
                                <Stack.Screen name="FARMERS" component={Farmers} />
                                <Stack.Screen name="PRODUCTS" component={Products} />
                                <Stack.Screen name="TO_CART" component={CartScreen} />
                                <Stack.Screen name="ORDER_LIST" component={Orders} />
                                <Stack.Screen name="PAY" component={Payment} />
                            </React.Fragment >
                        )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

