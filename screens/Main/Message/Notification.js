import React, { useEffect , useRef} from 'react';
import {Animated, View, Text, StyleSheet, Image, Alert } from 'react-native';
import Constant from '../../../components/Constants';
import Header from '../../../components/Header';


const Notification = props=>{

    return(
        <View style={styles.screen}>
            <Text> Notification</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
    },
    // mainArea:{
    //     justifyContent:'center',
    //     alignItems:'center',
    //    // backgroundColor:'yellow',
    //     flex:1, 
    //     width:'100%', 
    //     paddingTop:94
    // },
});

export default Notification;