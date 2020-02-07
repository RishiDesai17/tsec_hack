import React, { useState, useEffect, useContext } from 'react';
import {View,Image, ActivityIndicator,ScrollView, Button, AsyncStorage,TouchableOpacity, Dimensions,Linking} from 'react-native';
import { Text, Header,  Card, Body, Left, CardItem, Container, Content, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import GetLocation from 'react-native-get-location';
import { Context } from '../Context/context';
import {PieChart} from "react-native-chart-kit";
let a=[];
const datas = 
    [
      {
        name: 'Electronics',
        population: 5,
        color: '#003f5c',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Fitness',
        population: 7,
        color: '#ff6361',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Kitchen',
        population: 6,
        color: '#ffa600',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Clothing',
        population: 3,
        color: '#bc5090',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Sports',
        population: 2,
        color: '#58508d',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Cellphones',
        population: 7,
        color: 'rgba(131, 167, 234, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
  ];
const Home = (props) => {
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
    const [flag1,setFlag1] = useState(false);
    const [userProd,setUserProd] = useState([]);
    const [loc,setLoc] = useState();
    const [ad,setAd] = useState();
    const fn = async() => {
        try{
            const resData = await fetch("https://secret-savannah-05381.herokuapp.com/products")
            const res = await resData.json();
            console.log(res);
            setProd(res.docs);
            const rec = await AsyncStorage.getItem('recommender');
            const cat = await JSON.parse(rec)[0].category;
            const cat1 = await JSON.parse(rec)[1].category;
            console.log(cat);
            const ar = res.docs.filter((xyz)=>{
                return xyz.category===cat 
            })
            const ar1 = res.docs.filter((xyz)=>{
                return xyz.category===cat1 
            })
            console.log(ar);
            setUserProd([ar[0],ar[1],ar1[0],ar1[1]]);
            setFlag(true);
        }
        catch(err){
            console.log(err);
        }
    }
    const fn2 = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log(location);
            setLoc(location);
            if(location.longitude>72.78&&location.longitude<72.99&&location.latitude<19.5&&location.latitude>18.92){
                array=[
                    {image: "https://images.livemint.com/img/2019/03/07/600x338/Hot2_1551702477380_1551999502794.jpg",
                      link: "https://www.hotstar.com/in"  },
                    {image: "https://pro2-bar-s3-cdn-cf4.myportfolio.com/5a9f8f9fd2db409433822e353ce5dbe0/5ee52147-7a85-4deb-a2d7-0033a0d12ed7_rw_1200.jpg?h=5c02faa96d28e3a34729877f7189fe76",
                    link: "https://in.bookmyshow.com/ahmedabad/movies/street-dancer-3/ET00124186"
                    },
                    {image: "https://www.hdwallpapers.in/download/facebook_logo-1920x1080.jpg",link: "https://www.facebook.com/"},
                ];
                console.log(array[Math.round(Math.random()*2)])
                setAd(array[Math.round(Math.random()*2)]);
                setFlag1(true);
            }
        })
        .catch(error => {
            const { code, message } = error;
            console.log(code, message);
        })
    }
    useEffect(()=>{
        fn();
        fn2();
    },[])
    return(
        <ScrollView>
            {flag1&&<View style={{backgroundColor:'black'}}>
                <Text style={{color: 'white'}}>Ad!</Text>
                <TouchableOpacity onPress={()=>{Linking.openURL(ad.link)}}>
                    <Image source={{uri: ad.image}} style={{height: 60,width: 360,borderColor:'white'}} />
                </TouchableOpacity>
                
                </View>}
                <Text style={{alignSelf:'center',fontSize:35,fontFamily: 'Montserrat-Regular'}}>CATEGORIES</Text>
                <PieChart
  data={datas}
  width={Dimensions.get('window').width -5 }
  height={220}
  chartConfig={{
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
      marginRight: 10,
      width: '100%'
    },
  }}
  style={{
    
  }}
  accessor="population"
  backgroundColor="transparent"
  paddingLeft="15"
   //for the absolute number remove if you want percentage
/><Text style={{alignSelf:'center',fontSize:35,fontFamily: 'Montserrat-Regular'}}>RECOMMENDED</Text>
            {flag?userProd.map((item)=>(
                // <View>
                //     <Image style={{height:200,width: 300}} source={{uri: item.image}} />
                //     <Text>{item.name}</Text>
                //     <Text>{item.price}</Text>
                //     <Text>{item.category}</Text>
                //     <Text>{item.subcategory}</Text>
                //     <Button title="add" onPress={()=>{
                //         //context.add(item._id,item.price);
                //         a=userProd;
                //         a.cart.push(item)
                //         setUserProd(a);
                //         patch(a.cart)
                //     }} />
                //     <Button title="del" onPress={()=>{}}/>
                // </View>
                // <Container style={{ borderColor: '#0f0' }}>
                <ScrollView horizontal={true}>
                <Content padder>
                  <Card transparent>
        
                    <CardItem style={{ borderRadius: 20, borderWidth: 1, borderColor: '#000' }}
                      header={true}
                    >
                      
                      <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                      <Icon name={"book"}
                          style={{alignSelf: 'flex-end'}}
                          ></Icon>
       
                        <Left>
                          <TouchableOpacity onPress ={()=>props.navigation.navigate('Overview',{
                                image : item.image,
                                name : item.name,
                                price : item.price,
                                category : item.category,
                                it: item,
                                p: userProd
                            })}>
                            <Image
                              style={{ width: 300, height: 400 }}
                              source={{ uri: item.image }}
                            />
        
                          </TouchableOpacity>
        
        
                        </Left>
        
        
                        {/* <Text style={{ alignSelf: 'center' }}>{item.name}</Text> */}
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                          <Text style={{ alignSelf: 'flex-start' }}>{item.name}</Text>
                          <Body />
                          <Text style={{ alignSelf: 'flex-end' }}>Price: {item.price}</Text>
                        </View>
        
        
        
                      </View>
                    </CardItem>
                  </Card>
                  
                </Content></ScrollView>
              
            )):<ActivityIndicator size="large" />}
            
            <Text></Text>
        </ScrollView>
    )
}

export default Home;