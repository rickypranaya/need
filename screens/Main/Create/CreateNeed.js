import React, { useEffect , useRef, useState} from 'react';
import {View, Animated, FlatList, SafeAreaView, Text, StyleSheet, Image, Alert, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Constant from '../../../components/Constants';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MainButton from '../../../components/button/MainButton';

const CreateNeed = props=>{
    // Data needed to create need //
    const [need, setNeed] = useState('')
    const [description, setDescription] = useState('')
    const [imageData, setImage] = useState([{id:'add',uri:'add'}])
    const [fee, setFee] = useState('')
    const [paymentOption, setPaymentOption] = useState('Cash')
    const [location, setLocation] = useState(null)
    const [scheduled, setScheduled] = useState(false)
    const [date, setDate] = useState(new Date())
    const [dateString, setDateString] = useState('Schedule for')
    
    // To highlight the active text input //
    const [activeBorder1, setActiveBorder1] = useState(Constant.GREY_BACKGROUND)
    const [activeBorder2, setActiveBorder2] = useState(Constant.GREY_BACKGROUND)
    const [activeBorder3, setActiveBorder3] = useState(Constant.GREY_BACKGROUND)

    // Set the Modal visibility (Image option, View Images, Datepicker) //
    const [isModalVisible, setModalVisible]= useState(false)
    const [openPhotoModal, setPhotoModal]= useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

    // Other variable needed for state //
    const [chosenImage, setChosenImage] = useState('')
    const [keyboardOffset, setKeyboardOffset] = useState(0)
    const [keyboardPadding, setKeyboardPadding] = useState(false)

    // receive location from location screen //
    useEffect(() => {
        if (props.route.params?.post) {
            setLocation(props.route.params.post)
        }
    }, [props.route.params?.post]);

    // image options //
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission to access gallery was denied');
            return;
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [5, 5],
                quality: 1,
            });
          
            if (!result.cancelled) {
                var randId = Math.random();
                setImage([{id:randId.toString(), uri:result.uri},...imageData]);
            }
        }
    };

    const snapImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission to access camera was denied');
            return;
        } else {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                //   allowsEditing: true,
                aspect: [5, 5],
                quality: 1,
            });
                    
            if (!result.cancelled) {
                var randId = Math.random();
                setImage([{id:randId.toString(), uri:result.uri},...imageData]);
            }
        }
    };

    const renderImage = (src) => {
        if (src.item.uri == 'add'){
            return (
                <TouchableOpacity  onPress={()=>{setModalVisible(true)}} >
                    <View style={styles.addPhotos}>
                        <Icon
                        name='add-circle-outline'
                        type='ionicon'
                        color={Constant.GREY_PLACEHOLDER}
                        size={40}
                        />
                    </View>
                </TouchableOpacity>
            )
        } else {
            return(
                <TouchableOpacity 
                    onPress={()=>{
                        setChosenImage(src.item.uri);
                        setPhotoModal(true);
                    }} 
                >
                    <Image
                        style={styles.addPhotos} 
                        source={{uri:src.item.uri}}
                        resizeMode='cover'
                    />
                </TouchableOpacity>
            )
        }  
    };

    const removeImage =()=>{
        setPhotoModal(false);
        var filtered = imageData.filter(function(value, index, arr){ 
            return value.uri != chosenImage;
        });
        setImage(filtered)
    }

    // Location button function
    const chooseLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        } else {
            props.navigation.navigate('getLocation');
        }
    }

    // Ui of scheduled button on different state
    const scheduleButton = (string)=>{
        let action;
        let fWeight = 'normal';
        let fColor = Constant.GREY_PLACEHOLDER;
        let backColor = Constant.GREY_BACKGROUND;
        let borderWidth = 1;

        if (scheduled == false){
            if (string == 'Now'){
                action =()=>{ 
                    setScheduled(false);
                    setDateString('Schedule for'); 
                }
                fWeight = 'bold';
                fColor = Constant.PRIMARY_COLOR;
                backColor =  '#E3F6FF';
                borderWidth = 1.5;
            } else {
                action =()=>{showDatePicker()}
            }
        } else {
            if (string == 'Now'){
                action =()=>{ 
                    setScheduled(false);
                    setDateString('Schedule for'); 
                }
            } else {
                action =()=>{ showDatePicker()}
                fWeight = 'bold';
                fColor = Constant.PRIMARY_COLOR;
                backColor =  '#E3F6FF';
                borderWidth = 1.5;
            }
        }

        return(
            <TouchableOpacity 
                style={[
                    styles.schedule,
                    {
                        borderWidth: borderWidth,          
                        borderColor: fColor,
                        backgroundColor:backColor,
                    }]}
                onPress={action}
            > 
                <Text style={{color: fColor, fontWeight:fWeight}}>
                    {string}
                </Text>
                {string == 'Schedule for'?
                <Icon
                    name='arrow-drop-up'
                    type='material'
                    color={fColor}
                    size={20}
                />
                : null}
            </TouchableOpacity>
        )
    }

    // Datetimepicker functions
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirm = (date) => {
        const now = new Date();
    
        if ( date < now ){
            if (Platform.OS === 'ios'){
                Alert.alert('Please enter valid time')
            } else {
                hideDatePicker();
                setTimeout(() => {
                    Alert.alert('Please enter valid time')
                }, 500);
            }
        }
        else {
            var dateString = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate() + " " + date.getHours() + ":" + date.getUTCMinutes()
            hideDatePicker();
            setScheduled(true);
            setDate(date)
            setDateString(convertDate(date))
        }
    };

    // Convert date object to '12 Jun, 08:00 Pm'
    const convertDate = (dateFrom) => {
        var date = new Date(dateFrom)
        var today = new Date()
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var monthIndex = date.getMonth();
        var hours = (date.getHours() % 12) || 12;

        if (hours > 9) {
            hours = hours
        }
        else {
            hours = "0" + hours
        }

        var ampm = date.getHours() >=12 ? ' Pm' : ' Am'
        var minutes = date.getMinutes()
        if (minutes > 9) {
            minutes = minutes
        }
        else {
            minutes = "0" + minutes
        }

        var dateString;  
        if (dateFrom.getDate() == today.getDate() && dateFrom.getMonth() == today.getMonth()){
            dateString = 'Today'
        } else {
            dateString= date.getDate() + " " + monthNames[monthIndex]
        }
    
        return dateString + ", " + hours + ":" + minutes + ampm
    }

    const postNeed = () => {
        var images = [...imageData]
        images.splice(-1,1)
        
        var body = {
            need: need,
            description : description,
            image : images.length == 0? null : images,
            payment :{
                fee: fee,
                method: paymentOption
            },
            location : location,
            schedule : scheduled? date: 'now',
        }

        console.log(body)
    }
    
    return(
        <SafeAreaView style={styles.screen}>
            <ScrollView style={styles.mainArea} showsVerticalScrollIndicator={false} >
                <KeyboardAvoidingView enabled={keyboardPadding} behavior='position' keyboardVerticalOffset={keyboardOffset}>
                    <View style={{paddingHorizontal: Constant.PADDING_HORIZONTAL}}>
                        <TouchableOpacity style={{ paddingTop:5}} onPress={()=>{props.navigation.goBack()}}>
                            <Icon
                                style={{alignSelf:'flex-start'}}
                                name='x'
                                type='feather'
                                color='#3c3c3c'
                                size={30}
                            />
                        </TouchableOpacity>
                
                        <Text style={styles.bigText}>What do you need ?</Text>
                        <View style={[styles.textField,{borderWidth:1, borderColor: activeBorder1,}]}>
                            <TextInput
                                clearButtonMode='while-editing'
                                placeholder= 'Write whatever you need'
                                placeholderTextColor={Constant.GREY_PLACEHOLDER}
                                returnKeyType="done"
                                autoCapitalize="none"
                                style={{flex:1, padding: Platform.OS === 'ios'? 13 : 7}}

                                onChangeText={(val) => {
                                    setNeed(val)
                                }}

                                onFocus={(onFocus)=>{
                                    if (onFocus){
                                        setActiveBorder1(Constant.PRIMARY_COLOR)
                                        setKeyboardPadding(false)
                                    } 
                                }}

                                onEndEditing={()=>{
                                    setActiveBorder1(Constant.GREY_BACKGROUND)
                                }}
                            />
                        </View>

                        <Text style={styles.label}>Add details</Text>
                        <View style={[styles.textField,{borderWidth:1, borderColor: activeBorder2,  alignItems:'flex-start'}]}>
                            <TextInput
                                multiline
                                numberOfLines={4}
                                placeholder= 'Describe what is your need more and provide any details needed for our santa.'
                                placeholderTextColor={Constant.GREY_PLACEHOLDER}
                                autoCapitalize="none"
                                style={{textAlignVertical:'top',width:'100%',minHeight:90, marginVertical:5,padding: Platform.OS === 'ios'? 13 : 7}}
                                
                                onChangeText={(val) => {
                                    setDescription(val)
                                }}

                                onFocus={(onFocus)=>{
                                    if (onFocus){
                                        setActiveBorder2(Constant.PRIMARY_COLOR)
                                        setKeyboardPadding(false)
                                    } 
                                }}

                                onEndEditing={()=>{
                                    setActiveBorder2(Constant.GREY_BACKGROUND)
                                }}
                            />
                        </View>
                        
                        <Text style={{fontSize:Constant.TERTIARY_FONT_SIZE, marginTop:5, color:Constant.TERTIARY_GREY_COLOR}}>Add photos (optional)</Text>
                    </View>

                    <FlatList 
                        horizontal={true}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        data={imageData}
                        renderItem={(item)=>{
                            return renderImage(item)
                        }}
                        keyExtractor={item => item.id}
                    />   

                    <View style={{paddingHorizontal:Constant.PADDING_HORIZONTAL}}>

                        <Text style={styles.label}>Payment</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <View style={[styles.textField,{borderWidth:1, borderColor: activeBorder3}]}>
                                <Text>   S$ </Text>
                                <TextInput
                                    clearButtonMode='while-editing'
                                    placeholder= 'how much you wanna pay'
                                    placeholderTextColor={Constant.GREY_PLACEHOLDER}
                                    returnKeyType="done"
                                    autoCapitalize="none"
                                    keyboardType= 'numeric'
                                    style={{flex:1, padding: Platform.OS === 'ios'? 13 : 7}}
                                    
                                    onChangeText={(val) => {
                                        
                                        setFee(val)
                                    }}

                                    onFocus={(onFocus)=>{
                                        if (onFocus){
                                            setActiveBorder3(Constant.PRIMARY_COLOR)
                                            setKeyboardPadding(true)
                                        } 
                                    }}

                                    onEndEditing={()=>{
                                        setActiveBorder3(Constant.GREY_BACKGROUND)
                                        setKeyboardPadding(false)
                                        Platform.OS === 'ios'? setKeyboardOffset(0) : null
                                    }}
                                />
                            </View>

                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon
                                    style={{marginLeft:20, marginRight:5}}
                                    name='money-bill'
                                    type='font-awesome-5'
                                    color='black'
                                    size={20}
                                />
                            <Text> {paymentOption} </Text>
                            </View>
                        </View>

                        <Text style={styles.label}>Location</Text>
                        <TouchableOpacity style={styles.textField} onPress={()=>{chooseLocation()}}>
                            <Icon
                                style={{marginLeft:10}}
                                name='location-on'
                                type='material'
                                color='orange'
                                size={20}
                            />
                            <Text style={{flex:1, padding:13}}>
                                {location? location.header: 'choose your location'}
                            </Text> 
                        </TouchableOpacity>

                        <Text style={styles.label}>When do you need it?</Text>
                        <View style={styles.scheduleContainer}>
                            {scheduleButton('Now')}
                            {scheduleButton(dateString)}
                        </View>
                    </View> 
                </KeyboardAvoidingView>
            </ScrollView>

            <Animated.View style={styles.bottomAction}>
                <MainButton title='Post need' onPress={postNeed}/>
            </Animated.View>  
                 
            <Modal
             isVisible={isModalVisible}
             animationInTiming ={400}
             onBackdropPress={()=>{setModalVisible(false)}}
             onBackButtonPress={()=>{setModalVisible(false)}}
             >
                <View style={styles.cameraModal}>
                    <Text style={{fontSize:15, fontWeight:'bold'}}>Add Photos</Text>                       
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity 
                            style={styles.photoOption} 
                            onPress={()=>{
                                setModalVisible(false);
                                setTimeout(()=>{ snapImage()}, 500);
                            }}
                        >                          
                            <Icon
                                style={{margin:10}}
                                name='camera'
                                type='ionicon'
                                color={Constant.PRIMARY_COLOR}
                                size={25}
                            />
                            <Text style={{fontSize:13, fontWeight:'500'}}>Take Photo</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.photoOption} 
                            onPress={()=>{
                                setModalVisible(false);
                                setTimeout(()=>{ pickImage()}, 800);
                            }}
                        >
                            <Icon
                                style={{margin:10}}
                                name='image'
                                type='ionicon'
                                color={Constant.PRIMARY_COLOR}
                                size={25}
                            />
                            <Text  style={{fontSize:13, fontWeight:'500'}}>Choose Image</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
            isVisible={openPhotoModal}
            onBackdropPress={()=>{setPhotoModal(false)}}
            onBackButtonPress={()=>{setPhotoModal(false)}}
            >
                <View style={{ borderRadius:10, alignSelf:'center', justifyContent:'center'}}>
                    <Image
                        style={styles.showPhoto} 
                        source={{uri : chosenImage}}
                        resizeMode='cover'
                    />

                    <TouchableOpacity style={{position:'absolute', bottom:-60, alignSelf:'center'}} onPress={()=>{removeImage()}}>
                        <Icon
                            reverse
                            name='trash'
                            type='ionicon'
                            color='#EA4949'
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            </Modal>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                minimumDate={new Date()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        backgroundColor:'white'
    },
    mainArea:{
        paddingTop:10,
    },
    bigText:{
        color:'#3c3c3c',
        fontSize: 20,
        fontWeight:'bold',
        paddingTop:15,
    },
    textField:{
        flexDirection:'row',
        backgroundColor: Constant.GREY_BACKGROUND,
        borderRadius:10,
        marginVertical:7,
        flex:1,
        alignItems:'center'
    },
    label:{
        fontSize:Constant.SECONDARY_FONT_SIZE, 
       // fontWeight:'500',
        color:'#3c3c3c',
        paddingTop:12,
    },
    addPhotos:{
        height:100,
        width: 100,
        borderRadius:10,
        backgroundColor:Constant.GREY_BACKGROUND,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
        marginHorizontal:5,
        overflow: 'hidden'
    },
    cameraModal:{
        paddingVertical:15, 
        paddingHorizontal:15,
        backgroundColor:'white', 
        alignSelf:'center',
        borderRadius:10,
    },
    photoOption:{
        padding:10,
        backgroundColor:Constant.GREY_BACKGROUND,
        marginTop:30,
        marginBottom:10,
        marginHorizontal:5,
        borderRadius:5,
        width:Constant.DEVICE_WIDTH*0.34,
        alignItems:'center'
    },
    showPhoto:{
        width: Constant.DEVICE_WIDTH*0.95,
        height: Constant.DEVICE_WIDTH*0.95,
    },
    scheduleContainer:{
        flexDirection:'row',
        marginTop:10,
        marginBottom:50,
        flex:1,
    },
    schedule:{
        flexDirection:'row',
        paddingHorizontal:20,
        paddingVertical:8,
        borderRadius:50,
        marginRight:10,
        alignItems:'center'
    },
    bottomAction : {
        borderTopWidth:1, 
        borderTopColor:'lightgrey' ,
        paddingVertical:5, 
        width:Constant.DEVICE_WIDTH, 
        alignItems:'center'}
});

export default CreateNeed;