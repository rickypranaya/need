import React, { useState , useRef, useEffect} from 'react';
import {Keyboard,  SafeAreaView, View, Text, StyleSheet, TextInput,TouchableOpacity, Alert, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import Constant from '../../../components/Constants';
import Header from '../../../components/Header';
import MockMessage from "./MockMessages.json";
import { moderateScale, verticalScale } from 'react-native-size-matters';
import {Icon} from 'react-native-elements';
import TextField from '../../../components/TextField';


const ChatRoom = props=>{
    // user id placeholder
    const user_id = "0"

    const name = props.route.params.name
    const [messageData, setMessageData] = useState(MockMessage)
    const [message, setMessage] = useState('')
    const inputEl2 = useRef(null);

    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const onKeyboardShow = event => setKeyboardOffset(event.endCoordinates.height);
    const onKeyboardHide = () => setKeyboardOffset(0);
    const keyboardDidShowListener = useRef();
    const keyboardDidHideListener = useRef();

    useEffect(() => {
        keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
        keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);

        return () => {
            keyboardDidShowListener.current.remove();
            keyboardDidHideListener.current.remove();
        };
    }, []);

    const renderItem=(item)=>{
        // console.log(item)

        // var months = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemeber'];
        // var dateString = item.time;
        // var today = new Date();
        // var date = new Date((item.time).substring(0,10));
        // date.setHours(0);
        // var diff = parseInt((today- date) / (1000 * 60 * 60 * 24), 10);
        var type = item.id;
        var color = null;
        var align = null;
        var textColor = null;
        var self = item.user.id == user_id;
        var messageTime = null;
  
         if (!self){
          color = 'white';
          align = 'flex-start';
          textColor = 'black';  
        } else{
          color = '#0487C2';
          align = 'flex-end';
          textColor = 'white';
        }
  
        // if (diff == 0){
        //   messageTime = 'Today';
        // } else if (diff == 1){
        //   messageTime = 'Yesterday';
        // } else{
        //   messageTime = months[date.getMonth()] +' '+date.getDate();
        // }
  
        return(
          <View>
          {/* {this.state.chatDate.includes(dateString)? */}
          {/* <View style={{backgroundColor:'lightgrey', padding:8,borderRadius:20,alignSelf:'center', marginBottom:15}}>
            <Text style={{fontSize:13, color:'grey'}}>Today</Text>
          </View>  */}
          {/* : null} */}
  
          <View style={{alignSelf: align, alignItems:align, maxWidth:Constant.DEVICE_WIDTH*0.7,marginVertical:verticalScale(3),marginHorizontal:moderateScale(20)}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {/* {this.state.errorMessages.includes(item.id) ?
            <Icon
              containerStyle={{marginHorizontal:10}}
              //reverse
              //raised
              name='error'
              type='material'
              color='red'
              size={25}
            /> : null} */}
            <View style={{backgroundColor:color, paddingHorizontal:10, paddingVertical:9,borderRadius:15, borderBottomRightRadius:self?0:15, borderTopLeftRadius: self? 15:0}}>
               <Text style={{fontSize:16, fontWeight:'400', color:textColor}}>{item.message}</Text>
            </View>
            </View>
              <View style={{flexDirection:'row',marginTop:5, marginHorizontal:5,alignItems:'center'}}>
                {self ?
                <Icon
                  containerStyle={{marginHorizontal:5}}
                  //reverse
                  //raised
                  name='done-all'
                  type='material'
                // color='#0076FE'
                color={item.status == '0'? 'grey': '#0076FE' }
                  size={18}
                />
                  : null} 
                {/* <Text style={{fontSize:13, color:'grey'}}>{ (item.time).substring(11,16)}</Text> */}
                <Text style={{fontSize:13, color:'grey'}}>{item.created_at}</Text>
              </View>
          </View>
          </View>
          );
      }

      const sendMessage=()=>{
       // this.textInput.clear();
       inputEl2.current.clear();
        // setTimeout(() => { inputEl2.clear()}, 100);
  
        var dataTemp = messageData;
        var now = new Date();
        var hours = now.getHours().toString().length ==1?  '0'+now.getHours().toString():now.getHours();
        var minutes = now.getMinutes().toString().length ==1?  '0'+now.getMinutes().toString():now.getMinutes();
  
        var formatTime = '01234567890'+hours +':'+ minutes;
        var randId = Math.random();
        // dataTemp.unshift({
        //   'id': randId.toString(),
        //   'message': message,
        //   'time': formatTime,
        //   'sender_id': 1,
        //   'status' : '0'
  
        // });
    //  alert(JSON.stringify(this.emojiUnicode(this.state.message)))
  
        // NetInfo.fetch().then(state => {
        //     if (state.isConnected) {
        //     //  this.addChat();
        //     //  this.sendNotif();
              
         setMessageData([{
            "id" : randId.toString(),
            "message" : message,
            "created_at" : "12:00",
            "status" : "0",
            "user" :{
                "id": "0",
                "first_name" : "Steviani",
                "last_name" : "Angeline Tandika Septiani",
                "profile_image" : null
            }}
            ,...messageData])

              
            // } else {
            //     var errList = this.state.errorMessages;
            //     errList.unshift(randId);
            //     //alert(constant.NOINTERNET)
            //     this.setState({
            //       data: dataTemp,
            //       errorMessages:errList
            //     })
            // }
        // });
      }

    return(
        <SafeAreaView style={styles.screen}>

            <View style={[styles.mainArea,{paddingBottom: keyboardOffset==0 && Platform.OS=='ios'? 0: keyboardOffset-34}]}>     
                <FlatList
                 style={styles.chatLists}
                    data={messageData}
                    renderItem={({ item }) => renderItem(item)}
                    inverted={-1}
                    keyExtractor={item => item.id}
                />

                <View style={styles.BottomContainer}>
                    <View style={styles.textInputContainer}> 
                    <View style={styles.iconContainer}>
                            <TouchableOpacity 
                            onPress={()=>{message == ''?null: sendMessage()}}
                            style={styles.sendButton1}>
                                <Icon
                                //reverse
                                //raised
                                name='camera'
                                type='ionicon'
                                color= 'grey'
                                size={28}
                                />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            ref={inputEl2}
                            multiline={true}
                            placeholder="Write your message..."
                            style={styles.textInputStyle}
                            onEDit
                            onChangeText={text => setMessage(text)}
                            // onFocus={(onFocus)=>{
                            //     if (onFocus){
                            //         setMultiline(true)
                            //     } 
                            // }}

                            // onEndEditing={()=>{
                            //     setMultiline(false)
                            // }}
                        />

                        <View style={styles.iconContainer}>
                            <TouchableOpacity 
                            onPress={()=>{message == ''?null: sendMessage()}}
                            style={styles.sendButton2}>
                                <Icon
                                //reverse
                                //raised
                                name='send'
                                type='font-awesome'
                                color='white'
                                size={15}
                                />
                            </TouchableOpacity>
                        </View>
                    </View> 
                </View>
            </View>
        <Header header={true} onBack={()=>{props.navigation.goBack()}} title={name}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        backgroundColor:'white'
    },
    mainArea:{
        alignItems:'center',
        backgroundColor:'#f0f0f0',
        flex:1, 
        width:'100%', 
        marginTop: Platform.OS==='ios'? 50:94
    },
    chatLists: {
        width: Constant.DEVICE_WIDTH, 
    },
    BottomContainer : {
        alignItems:'center', 
        justifyContent:'center',
        width:Constant.DEVICE_WIDTH,  
        backgroundColor:'white', 
    },
    textInputContainer : {
        paddingVertical:10,
        flexDirection:'row',
        paddingHorizontal: Constant.PADDING_HORIZONTAL,
        justifyContent:'space-between',

    },
    textInputStyle : { 
        paddingTop: Platform.OS =='ios'?verticalScale(7):0,
        fontSize:15,
       // backgroundColor:'yellow',
        flex:1,
        maxHeight:120,
    },
    sendButton1: {
        alignItems:'flex-start',
        height:37,
        width:37, 
        justifyContent:'center',
        marginRight:5,
       // backgroundColor:'yellow'
    },
    sendButton2: {
        backgroundColor: Constant.PRIMARY_COLOR, 
        height:37,
        width:37, 
        borderRadius:12, 
        justifyContent:'center',
        marginLeft:5,
    },
    iconContainer : { 
        justifyContent:'flex-end',
    }
});

export default ChatRoom;