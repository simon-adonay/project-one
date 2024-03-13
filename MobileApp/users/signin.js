import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Text, Input } from 'react-native-elements';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import Spacer from './spacer'
import authContext from '../farmers/context';

const { width, height } = Dimensions.get('screen');

const signin = ({ navigation: { navigate } }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const { signIn } = React.useContext(authContext);
    const signInHundler = async () => {
        const response = await axios.post('http://localhost:5000/customers/signin', { email, password })
        console.log(response, 'in sign in  /// ')
        signIn(response)

        navigate('CUSTOMER')
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Spacer>
                <Text h3>Sign In</Text>
            </Spacer>
            <TextInput
                style={styles.input}
                numberOfLines={1}
                label="Email"
                value={email}
                onChangeText={setEmail}
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
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Spacer>
                <Button
                    style={styles.button}
                    contentStyle={styles.buttonContainer}
                    title='Sign In'
                    onPress={signInHundler}
                >Sign In</Button>
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
        marginLeft: 15,
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

export default signin