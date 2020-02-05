import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import React, { useState, useContext,useEffect } from 'react';
import {View,Text,StyleSheet,Platform,ScrollView,TextInput, Button, Alert, ActivityIndicator, AsyncStorage, Modal} from 'react-native';
import Signup from '../Modal/Signup';

const Login = (props) => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [modal,setModal] = useState(false);
    const [flag,setFlag] = useState(false);
    const [flag2,setFlag2] = useState(false);
    const [welcome,setWelcome] = useState(false);
    //const context = useContext(Context);
    useEffect(()=>{
        // GoogleSignin.configure({
        //     scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        //     webClientId: '302302613131-tti92v0ovj570fnd0csufuvpf4nqse7c.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        //     //hostedDomain: '', // specifies a hosted domain restriction
        //     //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        //     //forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
        //     //accountName: '', // [Android] specifies an account name on the device that should be used
        // });
        fn();
    },[])
    const fn = async()=>{
        try{
            setWelcome(true);
            setFlag2(true);
            //const type = await AsyncStorage.getItem("type");
            const userToken = await AsyncStorage.getItem("token");
            const url = 'https://secret-savannah-05381.herokuapp.com/users/token'
            const response = await fetch(url, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer "+userToken
                }
            })
            const resData = await response.json();
            setFlag2(false);
            if(resData.message==="success"){
                props.navigation.navigate('Main');
                setWelcome(false);
            }
            setWelcome(false);
        }
        catch(err){
            console.log(err);
        }
    }
    const submitHandler = async () => {
        //context.login(body,type);
        //props.navigation.navigate('Map');
        try{
            setFlag(true);
            const url = 'https://secret-savannah-05381.herokuapp.com/users/login';
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            const resData = await response.json();
            console.log(resData);
            setFlag(false);
            //setToken(resData.token);
            if(resData.token){
                AsyncStorage.setItem("token",resData.token)
                AsyncStorage.setItem("id",resData.docs[0]._id)
                AsyncStorage.setItem("name",resData.docs[0].name)
                AsyncStorage.setItem("email",resData.docs[0].email)
                AsyncStorage.setItem("phno",resData.docs[0].phno.toString())
                props.navigation.navigate('Main');
            }
            else
            Alert.alert("auth fail")
            //setUser(resData.docs);
            //console.log(resData.errors[0].message)
        }
        catch(err){
            console.log(err);
        }
        
    }
    let body;
    body={
        email:email,
        password:password
    }
    // const [isSigninInProgress,setIsSigninInProgress] = useState(false);
    // const [info,setInfo] = useState();
    // const signIn = async () => {
    //     try {
    //       await GoogleSignin.hasPlayServices();
    //       const userInfo = await GoogleSignin.signIn();
    //       setInfo({ userInfo });
    //       console.log(userInfo);
    //       props.navigation.navigation("Main")
    //     } catch (error) {
    //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         // user cancelled the login flow
    //         console.log("SIGN_IN_CANCELLED")
    //       } else if (error.code === statusCodes.IN_PROGRESS) {
    //         // operation (f.e. sign in) is in progress already
    //         console.log("IN_PROGRESS")
    //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         // play services not available or outdated
    //         console.log("PLAY_SERVICES_NOT_AVAILABLE")
    //       } else {
    //         // some other error happened
    //         console.log(error);
    //       }
    //     }
    //   };
    return(
        <ScrollView>
          <Modal visible={welcome} animationType="fade">
              <View style={{backgroundColor:"black",flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:"white",fontSize:45}}>MY APP</Text>
                <ActivityIndicator size="large" color="white" style={{marginTop:20}} />
              </View>
          </Modal>
          {flag2?<ActivityIndicator size="large" />:<View>
            <Text style={styles.title}>LOGIN</Text>
            {/* <View style={styles.switch}>
              <Button title={type} onPress={switchTypeHandler} />
            </View> */}
            <View style={styles.form}>
              <View style={styles.formControl}>
                  <Text style={styles.label} >Email</Text>
                  <TextInput style={styles.input} value={email} 
                      onChangeText={text=>setEmail(text)} keyboardType='email-address' />
              </View>
              <View style={styles.formControl}>
                  <Text style={styles.label} >Password</Text>
                  <TextInput style={styles.input} value={password} secureTextEntry={true} onChangeText={text=>setPassword(text)} />
              </View>
              
              <View>
                  <Button title="LOGIN" color="green" onPress={()=>submitHandler()} />
                  <Button title="signup" onPress={()=>setModal(true)} />
                  <Signup visible={modal} close={()=>setModal(false)} />
              </View>
              {flag?
              <ActivityIndicator size="large" />:null}
            </View>
            </View>
          }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form:{
        margin: 20
    },
    formControl:{
        width: '100%'
    },
    label:{
        fontFamily: 'Montserrat-Regular',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    title:{
        fontSize: 30,
        textAlign: 'center'
    },
    switch:{
        width: '20%',
        alignSelf: 'center',
        marginVertical: 20
    }
});

export default Login;