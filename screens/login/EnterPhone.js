import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import MainButton from '../../components/button/MainButton';
import Constant from '../../components/Constants';
import CountryPicker from 'react-native-country-picker-modal';
import Header from '../../components/Header';

const CreateAccount = props=>{
    const [countryCode, setCountryCode] = useState('SG');
    const [callingCode, setCallingCode] = useState('+65');
    const [phone, setPhone] = useState('');

    const onNext =()=>{
        if (phone == ''){
            Alert.alert('Please fill in your phone number');
        } else {
            props.navigation.navigate('otp',{
                first_name : props.navigation.getParam('first_name', '0'),
                last_name : props.navigation.getParam('last_name', '0'),
                email : props.navigation.getParam('email', '0'),
                password : props.navigation.getParam('password', '0'),
                phone : phone,
            });
        }
    }

    // to select country code from picker
    const selectCountryCode = (country) => {
        setCountryCode(country.cca2);
        setCallingCode("+"+country.callingCode);
    }

    return(
        <View style={styles.screen}>
            <Header onBack={()=>{props.navigation.goBack()}}/>
            {/* <BackButton onPress={()=>{props.navigation.goBack()}}/>            */}
            <KeyboardAvoidingView style={{width:'100%', position:'absolute', top: Constant.DEVICE_HEIGHT*0.2}} behavior={Platform.OS === 'ios' ? "padding" : null}>
                <View style={{alignSelf:'flex-start'}}>
                    <Text style={styles.bigText}>Enter your</Text>
                    <Text style={styles.bigText}>phone number</Text>
                    <Text style={styles.smallText}>we will send an OTP code via SMS to your phone number</Text>

                </View>
                <View style={{marginVertical:40}}>
                   
                <View style={styles.phoneField}>
                    <CountryPicker
                        withCallingCode={true}
                        countryCode={countryCode}
                        // country={this.state.country}
                        withFlag={true}
                        withFilter={true}
                        withModal={true}
                        onSelect={(country) => { selectCountryCode(country) }}

                    />
                <Text style={{ width: '15%', marginTop: 0 }}>{callingCode}</Text>
                <TextInput
                    onSubmitEditing ={()=>{}}
                    keyboardType='number-pad'
                    placeholder="Enter mobile number"
                    placeholderTextColor="#999999"
                    returnKeyType="done"
                    style={{ width: '60%', paddingHorizontal: 0, marginHorizontal: 0 }}
                    maxLength={11}
                    onChangeText={(val) => {
                        setPhone(val)
                    }}
                />
              </View>

                </View>
            </KeyboardAvoidingView>
           
            <View style={{alignItems:'center', position:'absolute', top: Constant.DEVICE_HEIGHT*0.85}}> 
                <MainButton title='Send OTP'  onPress={()=>{onNext()}}/>

                <View style={{flexDirection:'row', marginTop:20}}>
                    <View style={[styles.progress,{backgroundColor: 'grey'}]}></View>
                    <View style={[styles.progress,{backgroundColor:Constant.PRIMARY_COLOR}]}></View>
                    <View style={[styles.progress,{backgroundColor:'grey'}]}></View>
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
    phoneField:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'white', 
        borderRadius: 10, 
        paddingHorizontal: 5 , 
        borderColor:Constant.GREY_PLACEHOLDER, 
        borderWidth:1,         
        padding:10,
    },
    smallText:{
        color: Constant.TERTIARY_GREY_COLOR,
        marginVertical:5, 
        fontSize:Constant.TERTIARY_FONT_SIZE
    }

    
});

export default CreateAccount;