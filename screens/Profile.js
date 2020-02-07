import React, { useState,useEffect } from 'react';
import {View,Text,AsyncStorage,StyleSheet, Button,TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            {/* <Text>NAME: {name}</Text>
            <Text>PH NUMBER:{phno}</Text>
            <Text>EMAIL:{email}</Text> */}
            {/* <Button title="cart" onPress={()=>{
                props.navigation.navigate("Cart")
            }} /> */}
           
            {/* <Button title="whtsap" onPress={()=>{
                fn1();
            }} />
            <Button title="home" onPress={()=>{
                props.navigation.navigate("Home")
            }} /> */}
            <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.signOutButton} onPress={()=>{
                AsyncStorage.setItem('id',null)
                    props.navigation.navigate('Login');
                
            }} ><Icon name='sign-out'></Icon><Text style={{color: '#ffffff'}}>Sign out</Text></TouchableOpacity>
          </View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.info}>{email}</Text>
              <Text style={styles.description}>{phno}</Text>
              
              {/* <TouchableOpacity style={styles.buttonContainer}>
                <Text>Change Password</Text>  
              </TouchableOpacity>               */}
          
            </View>
        </View>
      </View>
        </View>
    )
}

const styles = StyleSheet.create({
    signOutButton: {
      marginTop:10,
      marginRight: 10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      alignSelf: 'flex-end',
      width:75,
      borderRadius:30,
      backgroundColor: "#000FFF",
    },
    header:{
      backgroundColor: "#00BFFF",
      height:200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
  });
   

export default Profile;