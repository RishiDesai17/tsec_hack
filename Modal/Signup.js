import React,{useState} from 'react';
import {View,Text,StyleSheet,Platform,ScrollView,TextInput, Button, Modal,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
const Signup = (props) => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [name,setName] = useState();
    const [number,setNumber] = useState();

    let body;
    
        body={
            email: email,
            password: password,
            name: name,
            phno: number
        }

    // const switchTypeHandler = () => {
    //     if(type==="Citizen Acc")
    //     setType("Police Acc");
    //     else
    //     setType("Citizen Acc");
    // }
    const submitHandler = async () => {
        try{
            const url = 'https://secret-savannah-05381.herokuapp.com/users/signup';
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            const resData = await response.json();
            console.log(resData);
            props.close();
        }
        catch(err){
            console.log(err);
            
        }
    }

    return(
        <Modal visible={props.visible} animationType="slide">
        <ScrollView>
          <Text style={styles.title}>SIGNUP</Text>
          <View style={{position:'absolute',top:5,right:5}}>
                    <Button title="X" onPress={props.close} />
                </View>
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
            <View style={styles.formControl}>
                <Text style={styles.label} >Name</Text>
                <TextInput style={styles.input} value={name} onChangeText={text=>setName(text)}/>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label} >Contact No.</Text>
                <TextInput style={styles.input} value={number} onChangeText={text=>setNumber(text)} keyboardType='numeric' />
            </View>
            <Text></Text>
            <View>
                {/* <Button title="Send Verification Key" onPress={()=>emailHandler()} /> */}
                <Button title="SUBMIT" color="green" onPress={()=>submitHandler()} />
            </View>
          </View>
        </ScrollView>
        </Modal>
    )
}

Signup.navigationOptions = navData => {
    return{
        headerTitle: 'Sign Up',
    }
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

export default Signup;