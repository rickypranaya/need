import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {Icon} from 'react-native-elements';
import Constant from './Constants';
import { withNavigation } from 'react-navigation';


const Header = props =>{
    return (
        <View style={{position:'absolute', top:0}}>
            <View style={{backgroundColor:'white', width:Constant.DEVICE_WIDTH, height:44}}>
            </View>

            <View style={[styles.header,{borderBottomWidth: props.header? 1 : 0}]}>
                {props.onBack?
                <TouchableOpacity onPress={()=>{props.onBack()}} style={styles.backButton}>
                    <Icon
                    // reverse
                    name='arrow-back'
                    type='material'
                    color='#3c3c3c'
                    size={30}
                    />
                </TouchableOpacity>
                :null}
                {props.title?
                <Text style={{fontSize:17, fontWeight:'600'}}>
                    {props.title}
                </Text>
                :null}

                {props.logo?
                <Image
                style={styles.logo} 
                source={require("../assets/images/need_blue.png")}
                resizeMode='contain'
                />
                :null}

                {props.icon?
                <TouchableOpacity onPress={()=>{props.onPress()}} style={styles.button}>
                    <Icon
                    // reverse
                    name={props.icon.name}
                    type={props.icon.type}
                    color='#3c3c3c'
                    size={28}
                    />
                </TouchableOpacity>
                :null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor:'white', 
        //backgroundColor:'green', 
        width:Constant.DEVICE_WIDTH, 
        height:50, 
        alignItems:'center',
        justifyContent:'center', 
        flexDirection:'row',
        // borderBottomWidth:1,
         borderBottomColor:'lightgrey',
    },
    backButton:{
        position:'absolute', 
        left:15,
        // backgroundColor:'yellow',
        padding:5,
    },
    logo:{
        width: Constant.DEVICE_WIDTH*0.2,
       // backgroundColor:'yellow',
        height: 20,
    },
    button:{
        position:'absolute', 
        right:15,
        // backgroundColor:'yellow',
        padding:5,
    }
});

export default withNavigation(Header);