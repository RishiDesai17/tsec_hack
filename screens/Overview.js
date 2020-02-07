import React, { useEffect, useState, useContext } from 'react';
import {ScrollView,View,Text, AsyncStorage, Button , Image, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {Context} from '../Context/context';

let a=[];

const Overview = (props) => {
    const [prod,setProd] = useState([]);
    const [flag,setFlag] = useState(false);  
    const fn = async() => {
        try{
            const userId = await AsyncStorage.getItem('id');
            const resData = await fetch("https://secret-savannah-05381.herokuapp.com/users/"+userId)
            const res = await resData.json();
            console.log(res);
            setProd(res.docs[0]);
            setFlag(true);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fn();
    },[])
    const patch = async(y) => {
        try{
            console.log(y);
            const userId = await AsyncStorage.getItem('id');
            const response = await fetch("https://secret-savannah-05381.herokuapp.com/users/"+userId,{
                method: 'PATCH',
                body: JSON.stringify({
                    cart: y
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const resData = await response.json();
            console.log(resData);
        }
        catch(err){
            console.log(err);
        }
    }
    return(
      
        <ScrollView>
            {flag?<View><Image style={{height: 330, width: 250, alignSelf: 'center', marginTop: 40, borderRadius: 15}} source ={{uri : props.navigation.getParam('image')}} />
    <Text style={styles.name}>{props.navigation.getParam('name')}</Text>
    <Text style={styles.name}>Price :{props.navigation.getParam('price')}</Text>
    <Text style={styles.info}>Category : {props.navigation.getParam('category')}</Text>
    <Button title="add" onPress={()=>{
                        //context.add(item._id,item.price);
                        a=prod;
                        a.cart.push(props.navigation.getParam('it'))
                        patch(a.cart)
                        Alert.alert("Added to cart!")
                    }} />
                    {/* <Button title="del" onPress={()=>{
                        a=prod;
                        const index = a.cart.findIndex((x)=>{
                           return x._id===props.navigation.getParam('it')._id
                        })
                        a.cart.splice(index,1);
                        patch(a.cart);
                    }} /> */}
                  </View>:<ActivityIndicator size="large" color="blue"/>}
        </ScrollView>
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
      fontFamily: 'Montserrat-Regular'
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
      color: "#000000",
      fontWeight: "600",
      marginLeft: 10,
      marginTop: 10
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10,
      alignSelf: 'center',
      marginLeft: 10,
      marginRight: 10,
      fontFamily: 'Montserrat-Regular'
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
   

export default Overview;