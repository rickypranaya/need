import React, {useState, useRef} from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import MainButton from '../../components/button/MainButton';
import Constant from '../../components/Constants';
import Header from '../../components/Header';
import { NavigationActions, StackActions } from 'react-navigation';


const Otp = props=>{
    const OTP = '1234';
    const [code1, setCode1] = useState();
    const [code2, setCode2] = useState();
    const [code3, setCode3] = useState();
    const [code4, setCode4] = useState();
    const [testResponse, setResponse] = useState();


    const first = useRef(null);
    const second = useRef(null);
    const third = useRef(null);
    const fourth = useRef(null);
    


    const addUser = async ()=>{
        const URL = Constant.BASE_URL+"/users_add";

        try{
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    first_name : props.navigation.getParam('first_name', '0'),
                    last_name : props.navigation.getParam('last_name', '0'),
                    email : props.navigation.getParam('email', '0'),
                    phone : parseInt(props.navigation.getParam('phone', '0')),
                    password : props.navigation.getParam('password', '0'),
                   }),
                headers:{
                    'Accept': 'application/json',
                    "Content-Type" : "application/json"
                }
            });
            if(response.status !=200){
                throw new Error("something is wrong!");
            } else{
                const responseData = await response.json();
                //setResponse(responseData.data);
               // Alert.alert(JSON.stringify(responseData.data));

            }
        }catch(error){
            Alert.alert(error.message);
        }
    }

    const signUp = ()=>{
        let typeOTP = code1+code2+code3+code4;
        if (typeOTP != OTP){
            Alert.alert('You have entered wrong OTP\nPlease try again')
        } else {
           // addUser();
            resetStack('home');
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
            <Header onBack={()=>{props.navigation.goBack()}}/>
            <KeyboardAvoidingView style={{width:'100%', position:'absolute', top: Constant.DEVICE_HEIGHT*0.2}} behavior={Platform.OS === 'ios' ? "padding" : null}>
                <View style={{alignSelf:'flex-start'}}>
                    <Text style={styles.bigText}>OTP</Text>
                    <Text style={styles.bigText}>verification</Text>
                    <Text style={styles.smallText}>Enter the verification code we just sent to your number</Text>

                </View>
                <View style={{marginVertical:40}}>
                    <View style={{
                        width:'100%',                            
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignSelf: 'center',
                        marginVertical: 5,
                    }}>
                        <TextInput
                            ref={first}
                            keyboardType='number-pad'
                            style={styles.inputContainer}
                            returnKeyType="done"
                            maxLength={1}
                            onChangeText={(val) => {
                                setCode1(val); 
                                val.length === 1 ? second.current.focus() : null
                            }} />

                        <TextInput
                            ref={second}
                            keyboardType='number-pad'
                            style={styles.inputContainer}
                            maxLength={1}
                            returnKeyType="done"

                            onChangeText={(val) => {
                                setCode2(val); 
                                val.length === 1 ? third.current.focus() :first.current.focus() 
                            }} />

                        <TextInput
                            ref={third}
                            keyboardType='number-pad'
                            returnKeyType="done"
                            style={styles.inputContainer}
                            maxLength={1}
                            onChangeText={(val) => {
                                setCode3(val); 
                                val.length === 1 ? fourth.current.focus() :second.current.focus() 
                            }} />

                        <TextInput
                            ref={fourth}
                            keyboardType='number-pad'
                            returnKeyType="done"
                            style={styles.inputContainer}
                            maxLength={1}
                            onChangeText={(val) => {
                                setCode4(val); 
                                val.length === 1 ? null:third.current.focus()  
                            }} />
                    </View>
                </View>
                <TouchableOpacity>
                    <Text style={{alignSelf:'flex-end', color:Constant.PRIMARY_COLOR}}>Resend OTP</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
           
            <View style={{alignItems:'center', position:'absolute', top: Constant.DEVICE_HEIGHT*0.85}}> 
                <MainButton title='Sign up' onPress={()=>{signUp()}}/>


                <View style={{flexDirection:'row', marginTop:20}}>
                    <View style={[styles.progress,{backgroundColor:'grey' }]}></View>
                    <View style={[styles.progress,{backgroundColor:'grey'}]}></View>
                    <View style={[styles.progress,{backgroundColor:Constant.PRIMARY_COLOR}]}></View>
                </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:Constant.DEVICE_WIDTH*0.15,
    },
    bigText:{
        fontSize:27,
        fontWeight:'bold',
    },
    progress:{
        marginHorizontal:3,
        width:10, 
        height:10, 
        borderRadius:50
    },
    underlineStyleBase: {
        fontWeight:"bold",
        fontSize:16,
        color:"black",
        borderRadius:10,
        backgroundColor: "white",
        width: 50,
        height: 50,
        borderWidth: 1,
        borderBottomWidth: 1,
    },
    inputContainer: {
        backgroundColor: 'white',
        borderWidth:1,
        borderColor:Constant.GREY_PLACEHOLDER,
        width: 45,
        height: 50,
        marginHorizontal: 10,
        color: 'black',
        alignSelf: 'flex-start',
        textAlign: 'center',
        fontSize: 14,
        borderRadius: 10,
    },
    smallText:{
        color: Constant.TERTIARY_GREY_COLOR,
        marginVertical:5, 
        fontSize:Constant.TERTIARY_FONT_SIZE
    }


    
});

export default Otp;