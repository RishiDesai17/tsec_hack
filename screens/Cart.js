import React, { useEffect, useState, useContext } from 'react';
import {View,Text, AsyncStorage} from 'react-native';
import {Context} from '../Context/context';

const Cart = (props) => {
    const [cart,setCart] = useState();
    const [flag,setFlag] = useState(false);
    const [total,setTotal] = useState();
    //const context = useContext(Context);
    const fn = async()=>{
        try{
            const userId = await AsyncStorage.getItem("id");
            const url = 'https://secret-savannah-05381.herokuapp.com/users/'+userId
            const response = await fetch(url, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    // 'Authorization': "Bearer "+userToken
                }
            })
            const resData = await response.json();
            console.log(resData);
            setCart(resData.docs[0].cart);
            console.log(cart);
            setFlag(true);
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
            {flag&&cart.map((item)=>(
                <View>
                    <Text>{JSON.stringify(item)}</Text>
                </View>
            ))}
            <Text></Text>
            
        </View>
    )
}

export default Cart;