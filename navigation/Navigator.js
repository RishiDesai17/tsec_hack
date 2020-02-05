import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screens/Login';
import Screen1 from '../screens/Screen1';
import Profile from '../screens/Profile';
import Cart from '../screens/Cart';
import Home from '../screens/Home';

const STNavigator = createStackNavigator({
    Profile: Profile,
    Screen1: Screen1,
    Cart: Cart,
    Home: Home
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS==='android' ? 'black':'',

        },
        headerTintColor: Platform.OS==='android' ? 'white' : 'black'
    },
});

const SwitchNav = createSwitchNavigator({
    Login: Login,
    Main: STNavigator
})

export default createAppContainer(SwitchNav);
