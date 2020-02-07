import React, { useState } from 'react'
import { View, Text, Button, Alert, AsyncStorage,Image } from 'react-native'
import { CreditCardInput } from "react-native-credit-card-input";
  
const Payment = (props) => {
    const [card,setCard] = useState();
    const fn = async() => {
        try{
            const no = await (await AsyncStorage.getItem('phno')).toString();
            //console.log(no);
            const response = await fetch('https://secret-savannah-05381.herokuapp.com/users/message',{
                method: 'POST',
                body: JSON.stringify({
                    phno: "+"+no,
                    text: "You paid Rs."+props.navigation.getParam('totalcost')+"from your card numbered "+card.values.number
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const res = await response.json();
            console.log(res);
            Alert.alert("Payment Successful"," ",[
                {text: "Done!",onPress: ()=>props.navigation.navigate('Home')}
            ]);
            //props.navigation.navigate('Home');
        }catch(err){
            console.log(err);
        }
    }
    // useEffect(()=>{
    //     fn();
    // },[])
    const _onChange = form => {console.log(form);setCard(form)}
    return (
        <View>
        <Text></Text>
        <Text></Text>
               <CreditCardInput onChange={_onChange} />
               <Text></Text>
            <Text style={{alignSelf:"center",fontSize:20}}>Total Cost : Rs {props.navigation.getParam('totalcost')}</Text>
            <Text></Text>
            <View style={{alignSelf:'center',width:'40%'}}>
            <Button color="#21bf73" onPress={()=>{
                fn(); 
            }} title="Make Payment"/>
            <Image style={{height:50,width:50,alignSelf:'center',marginTop: 20}} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"}} />
            <Text style={{alignSelf:'center',color:'grey'}}>WhatsApp Verified</Text>
            </View>
            
        </View>
    )
}

export default Payment;