import React, { useState } from 'react';
import {View,Text} from 'react-native';
import GetLocation from 'react-native-get-location';

const Screen1 = (props) => {
    const [loc,setLoc] = useState();
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
    .then(location => {
        console.log(location);
        setLoc(location);
    })
    .catch(error => {
        const { code, message } = error;
        console.log(code, message);
    })
    return(
        <View>
            <Text>Screen 1</Text>
            <Text>{JSON.stringify(loc)}</Text>
        </View>
    )
}

export default Screen1;