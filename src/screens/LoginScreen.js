import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Toast, Spinner  } from 'native-base';
import { setLoading } from '../redux/actions/loading';
import * as firebase from 'firebase';

const LoginScreen = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const isLoading = useSelector(state => state.loading.isLoading);
    const dispatch = useDispatch();

    const showToast = (message, types) => {
        Toast.show({
            text: message,
            buttonText: "Okay",
            type: types == "danger" ? "danger" : "success",
            duration: 3000,
            position: "bottom"
        })
    }   

    handleLogin = async () => {

        try {
            dispatch(setLoading(true))
            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            if (response.user.emailVerified) {
                setTimeout(() => {
                    showToast("Login Success", "success");
                    props.navigation.navigate("App");
                }, 250);
            } else {
                showToast("Verify Email First", "danger");
            }
        } catch (error) {
            setErrorMessage(error.message);
            showToast(errorMessage, "danger");
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <StatusBar backgroundColor="#FFEB00" barStyle="dark-content"></StatusBar>
                <Image source={require('../images/icon.png')} style={styles.logo}/>

                <View style={styles.form}>  
                    <View>
                        <TextInput
                            disabled={isLoading}
                            style={styles.inputEmail}
                            returnKeyLabel="Email"
                            returnKeyType="next"
                            placeholder="Enter Your Email....."
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={email => setEmail(email)}
                            value={email}
                        ></TextInput>
                    </View>

                    <View>
                        <TextInput
                            disabled={isLoading}
                            style={styles.inputPassword}
                            returnKeyLabel="Password"
                            returnKeyType="done"
                            placeholder="Enter Your Password....."
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => setPassword(password)}
                            value={password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity disabled={isLoading} style={styles.button} onPress={handleLogin}>
                    {isLoading ? <Spinner color='#FFEB00' /> : <Text style={styles.textLogin}>LOG IN</Text>}
                </TouchableOpacity>

                <TouchableOpacity  disabled={isLoading} style={styles.buttonText} onPress={() => props.navigation.navigate("Register")}>
                    <Text style={{ color: "black", fontSize: 13 }}>
                        New To TakChat ? <Text style={styles.textSignUp}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#FFEB00"
    },
    logo: {
        width:210, 
        height:210, 
        alignSelf:"center", 
        marginTop:70
    },
    form: {
        marginTop:40,
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputEmail: {
        paddingLeft:20,
        borderWidth: 0.5,
        borderColor: "#fbfbfb",
        backgroundColor: "#fbfbfb",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 50,
        fontSize: 15,
        color: "black"
    },
    inputPassword: {
        borderTopColor:"black",
        paddingLeft:20,
        borderWidth: 0.5,
        borderColor: "#fbfbfb",
        backgroundColor: "#fbfbfb",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        height: 50,
        fontSize: 15,
        color: "black"
    },
    button: {
        marginTop: 30,
        marginHorizontal: 80,
        backgroundColor: "#3B1E1E",
        borderRadius: 10,
        height: 55,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        alignSelf: "center",
        marginTop: 32
    },
    textLogin: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 17
    },
    textSignUp: {
        color:"#615414", 
        fontWeight: "bold",
        fontSize: 15 
    },

})

export default LoginScreen;