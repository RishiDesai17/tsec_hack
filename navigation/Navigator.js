import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import React from 'react';
import {Platform,Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screens/Login';
import Screen1 from '../screens/Screen1';
import Profile from '../screens/Profile';
import Cart from '../screens/Cart';
import Home from '../screens/Home';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Payment from '../screens/Payment';
import Overview from '../screens/Overview'


const profileNavigator = createStackNavigator({
    Profile: Profile
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS==='android' ? 'black':'',

        },
        headerTintColor: Platform.OS==='android' ? 'white' : 'black'
    },
});

const cartNavigator = createStackNavigator({
    Cart: Cart,
    Payment: Payment
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS==='android' ? 'black':'',

        },
        headerTintColor: Platform.OS==='android' ? 'white' : 'black'
    },
});

const homeNavigator = createStackNavigator({
    Home: Home,
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS==='android' ? 'black':'',

        },
        headerTintColor: Platform.OS==='android' ? 'white' : 'black'
    },
});
const searchNavigator = createStackNavigator({
    Search: Screen1,
    Overview: Overview
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS==='android' ? 'black':'',

        },
        headerTintColor: Platform.OS==='android' ? 'white' : 'black'
    },
})
const config = {
    Home:{
        screen: homeNavigator,
        navigationOptions:{
            tabBarColor: "blue",
            tabBarLabel: <Text style={{textAlign: 'center',marginBottom:13,fontSize: 17}}>Home</Text>
        }
    },
    Profile:{
        screen: profileNavigator,
        navigationOptions:{
            tabBarColor: "red",
            tabBarLabel: <Text style={{textAlign: 'center',marginBottom:13,fontSize: 17}}>Profile</Text>
        }
    },
    Cart: {
        screen: cartNavigator,
        navigationOptions:{
            tabBarColor: "red",
            tabBarLabel: <Text style={{textAlign: 'center',marginBottom:13,fontSize: 17}}>Cart</Text>
        }
    },
    Search: {
        screen: searchNavigator,
        navigationOptions:{
            tabBarColor: "green",
            tabBarLabel: <Text style={{textAlign: 'center',marginBottom:13,fontSize: 17}}>Search</Text>
        }
    }
}
const TabNav = createBottomTabNavigator(
    config
    ,{
        tabBarOptions:{
            activeTintColor: 'green'
        }
    }
)

const SwitchNav = createSwitchNavigator({
    Login: Login,
    Main: TabNav
})

export default createAppContainer(SwitchNav);
