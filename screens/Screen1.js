import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,Image, AsyncStorage } from 'react-native';
import {  Header,  Card, Body, Left, CardItem, Container, Content, Right } from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import SearchInput, { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['name', 'category'];
let temp;

const Screen1 = (props) => {
    const [loc,setLoc] = useState();
    const [prod,setProd] = useState();
    const [search,setSearch] = useState([]);
    const [flag,setFlag] = useState(false); 
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
    useEffect(()=>{
        fn();
    },[])
    
    return(
        <ScrollView>
            <SearchInput 
          onChangeText={(term) => { setSearch(prod.filter(createFilter(term, KEYS_TO_FILTERS))); }} 
          style={styles.searchInput}
          placeholder="Search for your favorites!"
          />
            {flag&&search.map((x)=>(
                <Content padder>
                <Card transparent>
      
                  <CardItem style={{ borderRadius: 20, borderWidth: 1, borderColor: '#000' }}
                    header={true}
                  >
                    
                    <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <Icon name='shopping-cart'
                        style={{alignSelf: 'flex-end'}}
                        ></Icon>
      
                      <Left>
                        <TouchableOpacity onPress={()=>{
                            AsyncStorage.getItem('recommender').then((prop)=>{
                                temp=JSON.parse(prop);
                                temp.forEach((prop1)=>{
                                    if(prop1.category===x.category){
                                        prop1.score+=1;
                                    }
                                })
                                AsyncStorage.setItem('recommender',JSON.stringify(temp));
                                AsyncStorage.getItem('recommender').then((abcd)=>{
                                    
                                    temp=JSON.parse(abcd)
                                    temp.sort((a, b) => b.score - a.score);
                                    console.log(temp);
                                    AsyncStorage.setItem('recommender',JSON.stringify(temp));
                                })
                                props.navigation.navigate('Overview',{
                                    image : x.image,
                                    name : x.name,
                                    price : x.price,
                                    category : x.category,
                                    res: prod,
                                    it: x
                                })
                            })
                        }}>
                          <Image
                            style={{ width: 300, height: 400 }}
                            source={{ uri: x.image }}
                          />
      
                        </TouchableOpacity>
      
      
                      </Left>
      
      
                      
                      <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ alignSelf: 'flex-start' }}>{x.name}</Text>
                        <Body />
                        <Text style={{ alignSelf: 'flex-end' }}>Price: {x.price}</Text>
                      </View>
      
      
      
                    </View>
                  </CardItem>
                </Card>
                
              </Content>
            ))}

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start'
    },
    emailItem:{
      borderBottomWidth: 0.5,
      borderColor: 'rgba(0,0,0,0.3)',
      padding: 10
    },
    emailSubject: {
      color: 'rgba(0,0,0,0.5)'
    },
    searchInput:{
      padding: 10,
      borderColor: '#CCC',
      borderWidth: 1
    }
  });
export default Screen1;