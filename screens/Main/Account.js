import React, { useEffect , useRef} from 'react';
import {Animated, View, Text, StyleSheet, Image, Alert } from 'react-native';
import Constant from '../../components/Constants';
import Header from '../../components/Header';

const Account = props=>{

    return(
        <View style={styles.screen}>
            <View style={styles.mainArea}>
                <Text> Account</Text>
            </View>
        <Header header={true} title='Account'/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
    },
    mainArea:{
        justifyContent:'center',
        alignItems:'center',
      //  backgroundColor:'yellow',
        flex:1, 
        width:'100%', 
        paddingTop:94
    },
});

export default Account;