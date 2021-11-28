import React, {useState} from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert, Image, TouchableOpacity } from 'react-native';
import MainButton from '../../components/button/MainButton';
import Constant from '../../components/Constants';
import TextField from '../../components/TextField';
import Header from '../../components/Header';
import { NavigationActions, StackActions } from 'react-navigation';


const Login = props=>{
    const [userName, setUser] = useState('');
    const [password, setPassword] = useState('');

    const login = ()=>{
        if (userName == ''){
            Alert.alert('Please fill in first name')
        } else if (password.length <= 5){
            Alert.alert('Please fill in your password')
        } else {
            resetStack('mainScreen');
        }
    }

    const resetStack = (screen) => {
        props
          .navigation
          .dispatch(StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: screen,
              }),
            ],
          }))
       }

    return(
        <View style={styles.screen}>
            <Image
            style={styles.logo} 
            source={require("../../assets/images/need_blue.png")}
            resizeMode='contain'
            />
            <KeyboardAvoidingView style={{width:'100%'}} behavior={Platform.OS === 'ios' ? "position" : null}>
                <View style={{marginVertical:40}}>
                    <TextField onChanged = {(val)=>{setUser(val)}} placeholder="Phone number or email"/>
                    <TextField onChanged = {(val)=>{setPassword(val)}} placeholder="Password" password="true"/>
                </View>
            </KeyboardAvoidingView>

            <MainButton title='Log in'  onPress={()=>{login()}}/>

            <TouchableOpacity onPress={()=>{Alert.alert('forgot password')}}>
                <Text style={styles.forgot}> Forgot password?</Text>
            </TouchableOpacity>

            <Header title='' onBack={()=>{props.navigation.goBack()}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        alignItems:'center',
        //paddingTop:197,
        justifyContent:'center',
        // backgroundColor:'yellow'
        paddingHorizontal:Constant.DEVICE_WIDTH*0.15,
        
    },
    bigText:{
        fontSize:27,
        fontWeight:'bold',
    },
    forgot:{
        color: Constant.PRIMARY_COLOR,
        fontSize: Constant.TERTIARY_FONT_SIZE
    },
    logo:{
        width: Constant.DEVICE_WIDTH*0.3,
        //backgroundColor:'yellow',
        height:Constant.DEVICE_HEIGHT*0.1
    },
});

export default Login;