import React, { useState,useEffect } from 'react';
import {View,Text,AsyncStorage, Button} from 'react-native';

const Profile = (props) => {
    const [email,setEmail] = useState();
    const [name,setName] = useState();
    const [phno,setPhno] = useState();
    const fn = async()=>{
        try{
           //let token1 = await AsyncStorage.getItem("token");
           let phno1 = await AsyncStorage.getItem("phno")
           let name1 = await AsyncStorage.getItem("name")
           let email1 = await AsyncStorage.getItem("email")
           //setToken(token1);
           setPhno(phno1);
           setName(name1);
           setEmail(email1);
        }
        catch(err){
            console.log(err);
        }
    }
    const fn1=async()=>{
        try{
            const body = {
                text: "Munni Badnaam hui darling jinit keliye",
                phno: "+917045175414"
            }
            const url = 'https://secret-savannah-05381.herokuapp.com/users/message';
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            const resData = await response.json();
            console.log(resData);
            //setFlag(false);
            //setToken(resData.token);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fn();
    },[])
    return(
        <View>
            <Text>Profile</Text>
            <Text>NAME: {name}</Text>
            <Text>PH NUMBER:{phno}</Text>
            <Text>EMAIL:{email}</Text>
            <Button title="cart" onPress={()=>{
                props.navigation.navigate("Cart")
            }} />
            <Button title="loc" onPress={()=>{
                props.navigation.navigate("Screen1")
            }} />
            <Button title="whtsap" onPress={()=>{
                fn1();
            }} />
            <Button title="home" onPress={()=>{
                props.navigation.navigate("Home")
            }} />
        </View>
    )
}

export default Profile;