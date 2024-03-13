import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Text, Input } from 'react-native-elements';
import { TextInput, Button } from 'react-native-paper';

import Spacer from './spacer'
import axios from 'axios'
import authContext from '../farmers/context'

const { width, height } = Dimensions.get('screen');


const signup = ({ navigation: { navigate } }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    React.useEffect(() => {
        signUpHundler()
    }, []);

    const signUpHundler = async () => {
        try {
            const response = await axios.post('http://localhost:5000/customers/signup', { email, password })

            signUp(response.data.Authorization)



        } catch (err) {
            console.log(err)

        }
        navigate('SIGN_IN')
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Spacer>
                <Text h3>Sign Up</Text>
            </Spacer>
            <TextInput
                style={styles.input}
                numberOfLines={1}

                label="Email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Spacer />
            <TextInput
                style={styles.input}
                numberOfLines={1}
                secureTextEntry
                label="Password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                autoCapitalize="none"
                autoCorrect={false}

            />
            <Spacer>
                <Button
                    style={styles.button}
                    contentStyle={styles.buttonContainer}
                    title="Sign Up"
                    onPress={signUpHundler}
                >Sign Up</Button>
            </Spacer>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 25,
        marginTop: 15
    },
    input: {
        marginTop: 10,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15
    },
    button: {
        marginTop: 10
    },
    buttonContainer: {
        width: width / 2,
        height: height / 15
    }
});

export default signup;