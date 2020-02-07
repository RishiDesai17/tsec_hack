import React, { useEffect, useState, useContext } from 'react';
import {View,Text, AsyncStorage, Button,Image, FlatList } from 'react-native';
import {Context} from '../Context/context';
import { Container, Content, Card,CardItem, Body } from 'native-base';

let priceTot=0;
const Cart = (props) => {
    const [cart,setCart] = useState([]);
    const [flag,setFlag] = useState(false);
    const [visible,setVisible] = useState(false);
    const [total,setTotal] = useState(0);
    const [ color,setColor] = useState("green");
    const [bText,setbText] = useState("Show Details");
    const [time,setTime] = useState("");
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
            resData.docs[0].cart.forEach((x)=>{
                
                priceTot+=x.price
                console.log(priceTot,x.price)
            })
            setTotal(priceTot);
            
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fn();
        var final = new Date(2020, 1, 13, 23, 59, 59).getTime();
setInterval(() => {
  var present = new Date().getTime();
  var remainingTime = final - present;
  var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  var hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  setTime(days + "d " + hours + "h " +
    minutes + "m " + seconds + "s ");
}, 1000);
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
        <View>
            <View style={{width: 120, alignSelf:'flex-end', marginRight: 10, marginVertical: 10}}>
            <Button style={{width: 40}} title={bText} color={color} onPress={()=>{
                            setVisible(!visible);
                            if(visible){
                                setbText("Show Details")
                                setColor("green")
                            }
                            else{
                                setbText("Hide Details")
                                setColor("red")
                            }
                        }}/>
            </View>
             
            {cart&&flag&&cart.map((item)=>(
                <View>
                    {/* <Text>{JSON.stringify(item)}</Text> */}
                    <Card>
                    <CardItem>
                        <Text>{item.name}</Text>
                        <Body />
                        
                       
                        {visible&&<View><Image source={{uri: item.image}} style={{width: 50,height:100}} /><Text>{item.category}</Text></View>}
                        <Text style={{marginRight:10}}>Rs {item.price}</Text>
                        <Button title="X" color="red" onPress={()=>{
                            a=cart
                            const index = a.findIndex((x)=>{
                                return x.name===item.name
                             })
                             a.splice(index,1);
                             priceTot-=item.price;
                             setTotal(priceTot)
                             setCart(a);
                             patch(a);
                             //fn();
                        }} />
                    </CardItem>
                </Card>                 
                {/* <FlatList
                    renderItem={(item) => <View><Text>asdfasdf</Text></View>} */}
                    
                    
                {/* /> */}
                </View>                
            ))}
                <Card >
                    <CardItem style={{backgroundColor: '#aaaa'}}>
                        <Text style={{fontStyle: 'italic', fontSize: 23}}>Final Price:</Text>
                        <Body />
                        <Text style={{fontStyle: 'italic', fontSize: 23}}>Rs {total}</Text>
                    </CardItem>
                </Card>
                    <View style={{width: '40%',alignSelf:'center',marginTop:15,borderWidth:2}}>
                    <Button style={{borderRadius:50}} title="Proceed to payment" onPress={()=>{props.navigation.navigate('Payment',{totalcost:total})}} />
                    </View>
            

            <Text style={{fontSize:15,textAlign:'center',marginTop:20 ,borderWidth:1}}>Please Do come back for our Valentine's Day Offer: FLAT 25% OFF!!</Text>
                <Text style={{fontSize: 30,fontFamily:'Montserrat-Regular',alignSelf:'center'}}>{time}</Text>

        </View>
    )
}

export default Cart;