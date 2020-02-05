import React, { useState, useEffect, useContext } from 'react';
import {View,Text,Image, ActivityIndicator,ScrollView, Button, AsyncStorage} from 'react-native';
import { Context } from '../Context/context';
let a=[];
const Home = () => {
     const [prod,setProd] = useState(//[
    //     {
    //         name: "shoe",
    //         price: 1000,
    //         image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    //     }
    // ]
    )
    const context=useContext(Context);
    const [flag,setFlag] = useState(false);
    const [userProd,setUserProd] = useState([]);
    const fn = async() => {
        try{
            const resData = await fetch("https://secret-savannah-05381.herokuapp.com/products")
            const res = await resData.json();
            console.log(res);
            setProd(res.docs);
            setFlag(true);
        }
        catch(err){
            console.log(err);
        }
    }
    const fn2 = async() => {
        try{
            const userId = await AsyncStorage.getItem('id')
            const res = await fetch("https://secret-savannah-05381.herokuapp.com/users/"+userId);
            const res1=await res.json();
            setUserProd(res1.docs[0]);
            console.log(res1.docs[0]);
        }
        catch(err){
            console.log(err);
        }
    }
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
    useEffect(()=>{
        fn();
        fn2();
    },[])
    return(
        <ScrollView>
            {flag?prod.map((item)=>(
                <View>
                    <Image style={{height:200,width: 300}} source={{uri: item.image}} />
                    <Text>{item.name}</Text>
                    <Text>{item.price}</Text>
                    <Text>{item.category}</Text>
                    <Text>{item.subcategory}</Text>
                    <Button title="add" onPress={()=>{
                        //context.add(item._id,item.price);
                        a=userProd;
                        a.cart.push(item)
                        setUserProd(a);
                        patch(a.cart)
                    }} />
                    <Button title="del" onPress={()=>{}}/>
                </View>
            )):<ActivityIndicator size="large" />}
            <Text></Text>
        </ScrollView>
    )
}

export default Home;